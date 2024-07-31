import { Ollama } from "@langchain/community/llms/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import dotenv from "dotenv";

dotenv.config();

const MODEL_INFO = {
  gpt_4o: "gpt-4o",
  gpt_4o_mini: "gpt-4o-mini",
  qwen2_7b: "qwen2:latest",
  llama3_8b: "llama3:latest",
  llama3_1_8b: "llama3.1:latest",
};

const systemPrompt =
  process.env.ENG_PROMPT ??
  process.env.PROMPT ??
  "You are a coding assistant. Based on the file below, please write the e2e test code that needs to be newly created or modified.";
const prompt = ChatPromptTemplate.fromMessages([
  ["system", systemPrompt],
  ["user", "Question: {question}\nContext: {context}"],
]);
const outputParser = new StringOutputParser();

const init = (modelName) => {
  if (String(modelName).toLowerCase().startsWith("gpt")) {
    return new ChatOpenAI({
      modelName: MODEL_INFO[modelName],
      apiKey: process.env.OPEN_AI_KEY,
      temperature: Number(process.env.TEMPERATURE) ?? 1,
      top_p: Number(process.env.TOP_P) ?? 1,
      max_tokens: Number(process.env.max_tokens) ?? undefined,
    });
  }
  return new Ollama({
    baseUrl: "http://localhost:11434", // Default value
    model: MODEL_INFO[modelName], // Default value
  });
};

const genTestCode = async (modelName, fileContents, testCaseName) => {
  if (!fileContents) {
    return "";
  }

  const model = init(modelName);
  const chain = prompt.pipe(model).pipe(outputParser);
  return await chain.invoke({ question: testCaseName, context: fileContents });
};

export { genTestCode };
