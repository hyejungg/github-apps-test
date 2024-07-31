import commands from "probot-commands";
import ignoreList from "./ignoreList.js";
import { genTestCode } from "./chat.js";

const MODEL_INFO = {
  gpt_4o: "gpt_4o",
  gpt_4o_mini: "gpt_4o_mini",
  qwen2_7b: "qwen2_7b",
  llama3_8b: "llama3_8b",
  llama3_1_8b: "llama3_1_8b",
};

export default (app) => {
  app.on("pull_request.opened", async (context) => {
    try {
      const { pull_request } = context.payload;

      const prComment = context.pullRequest({
        issue_number: pull_request.number,
        body: `현재 PR 기준으로 생성형 AI에게 E2E 테스트 코드 제안을 받으려면 \"/gen\"를 입력해주세요! 🎉\n테스트명을 같이 전달해주면 더 잘 작성할 수 있어요. 1번에 1개의 테스트 케이스명만 부탁드려요. 😅\nex. \`/gen 이름 form이 빈 값이면 생성 버튼 비활성화 표시\` 등`,
      });
      await context.octokit.issues.createComment(prComment);
    } catch (error) {
      app.log.error("Error creating pull_request comment");
      app.log.error(error);
    }
  });

  commands(app, "gen", async (context, command) => {
    try {
      const { issue } = context.payload;
      const testCaseName = command.arguments ?? "";
      const loadingComment = context.pullRequest({
        issue_number: issue.number,
        body: "테스트 코드를 만들고 있어요! 잠시만 기다려주세요...\n![Ellipsis@1x-4 2s-200px-200px](https://github.com/user-attachments/assets/303decd5-2c02-4d94-88c2-601d3c8db98e)",
      });

      const commentResponse = await context.octokit.issues.createComment(
        loadingComment,
      );
      const commentId = commentResponse.data.id;

      // 파일 가져오기
      const prFiles = await context.octokit.pulls.listFiles(
        context.pullRequest({
          pull_number: issue.number,
        }),
      );
      const fileContents = prFiles.data.map((file) => {
        return {
          filename: file.filename,
          fileExt: String(file.filename).split(".").reverse()[0],
          content: file.patch, // 간단하게 patch 내용을 사용
        };
      });

      const targetFile = fileContents
        // src 폴더 밑에 있는 파일 중에서
        .filter((file) => {
          const path = file.filename.split("/");
          return path.includes("src") && path.length > 1;
        })
        // ignore 관련 파일은 제외
        .filter(
          (file) =>
            !ignoreList.fileNames.some((ignoreFileName) =>
              String(file.filename).includes(ignoreFileName),
            ),
        )
        // json, md, ico 경우 제외
        .filter(
          (file) =>
            !ignoreList.extenstions.some((ignoreExt) =>
              String(file.fileExt).includes(ignoreExt),
            ),
        )
        .map((file) => file);

      if (targetFile.length <= 0) {
        const failCommandComment = context.pullRequest({
          issue_number: issue.number,
          comment_id: commentId,
          body: "PR 내에서 테스트 코드를 작성할 코드 및 파일이 없습니다! 😁",
        });
        await context.octokit.issues.createComment(failCommandComment);
        return;
      }

      // api 요청
      const modelName = MODEL_INFO.llama3_1_8b;
      try {
        const contents = targetFile.map((file) => {
          const fileName = file.filename;
          const content = file.content;
          return `// fileName: ${fileName}\n// code\n${content}`;
        });
        const res = await genTestCode(modelName, contents, testCaseName);

        if (res) {
          // api 응답을 기존의 코멘트에 수정해서 올리기
          const updatedComment = context.pullRequest({
            issue_number: issue.number,
            comment_id: commentId,
            body: `${modelName}가 E2E 테스트 코드를 작성했어요! 해당 내용은 참고만 부탁드립니다.\n${res}`,
          });
          await context.octokit.issues.updateComment(updatedComment);
        }
      } catch (error) {
        app.log.error("Error chat open ai");
        app.log.error(error);
        const failedComment = context.pullRequest({
          issue_number: issue.number,
          comment_id: commentId,
          body: `${modelName}가 E2E 테스트 코드 생성을 실패했어요. 잠시 후 다시 시도해주세요. 🥲`,
        });
        await context.octokit.issues.updateComment(failedComment);
      }
    } catch (error) {
      app.log.error("Error creating pull_request comment");
      app.log.error(error);
    }
  });

  app.onAny(async (context) => {
    app.log.info({ event: context.name, action: context.payload.action });
  });

  app.onError(async (error) => {
    app.log.error(error);
  });
};
