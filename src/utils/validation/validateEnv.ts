import { cleanEnv, port, str } from "envalid";

function validationEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ["development", "test", "production"] }),
    PORT: port({ default: 5051 }),
    DB_DIALECTS: str(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_HOST: str(),
    AUTH_TOKEN_SECRET: str(),
    AUTH_TOKEN_EXPIRE: str(),
  });
}

export default validationEnv;
