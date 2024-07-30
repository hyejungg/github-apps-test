# github-bot

실제로 해당 github에서 동작하는 gituhb apps 봇입니다.
github 웹훅을 트리거 해서 관련 동작을 수행합니다.

## Setup

반드시 node 20 이상 버전을 사용해야 합니다. (20.11.1 >=)

```sh
# Install dependencies
npm install

# Run the bot
npm run dev
```

## Docker

```sh
# 1. Build container
docker build -t gen-e2e-test .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> gen-e2e-test
```

## Contributing

If you have suggestions for how gen-e2e-test could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2024 김혜정(molly.ouo)
