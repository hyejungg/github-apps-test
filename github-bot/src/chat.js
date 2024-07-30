import { ChatGPTAPI } from "chatgpt";
import ollama from "ollama";

const chatGptApi = {
  model: {
    GPT_4o: "gpt-4o",
    GPT_4o_mini: "gpt-4o-mini",
  },
  init: (modelName) => {
    const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
    if (!OPEN_AI_KEY) {
      new Error("No open ai key!!!!!!!");
    }
    try {
      return new ChatGPTAPI({
        apiKey: OPEN_AI_KEY,
        completionParams: {
          model: chatGptApi.model[modelName],
          temperature: Number(process.env.TEMPERATURE) ?? 1,
          top_p: Number(process.env.TOP_P) ?? 1,
          max_tokens: Number(process.env.max_tokens) ?? undefined,
        },
      });
    } catch (error) {
      console.error(error);
    }
  },
};

const chatOllama = {
  model: {
    qwen2_7b: "qwen2:latest",
    llama3_8b: "llama3:latest",
    llama3_1_8b: "llama3.1:latest",
  },
  getRequestParams: (modelName, prompt) => {
    return {
      model: chatOllama.model[modelName],
      prompt: `${prompt}`,
      stream: false,
    };
  },
};

const generatePrompt = (fileContents, testCaseName) => {
  const answerLanguage = process.env.LANGUAGE
    ? `Answer me in ${process.env.LANGUAGE},`
    : "";

  let prompt =
    process.env.ENG_PROMPT ??
    process.env.PROMPT ??
    "You are a coding assistant. Based on the file below, please write the e2e test code that needs to be newly created or modified.";

  prompt += `\nTest caseName: ${testCaseName}`;

  const finalPrompt = `${prompt}\n${answerLanguage}\n${fileContents}`;
  console.log(finalPrompt);

  return finalPrompt;
};

const genTestCode = async (modelName, fileContents, testCaseName) => {
  if (!fileContents) {
    return "";
  }

  console.time("gen test code cost");
  const prompt = generatePrompt(fileContents, testCaseName);

  let res;
  if (String(modelName).startsWith("GPT")) {
    res = await chatGptApi.init(modelName).sendMessage(prompt);
    res = res.text;
  } else {
    const params = chatOllama.getRequestParams(modelName, prompt);
    try {
      const data = await ollama.generate(params);
      res = data.response;
    } catch (error) {
      console.error("Error generating response with Ollama:", error);
    }
  }

  console.timeEnd("gen test code cost");
  return res;
};

export { genTestCode };
