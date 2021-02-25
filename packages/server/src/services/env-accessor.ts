type ProcessEnv = {
  // general
  NODE_ENV: string;
  NODE_PORT: string;
  APPLICATION_PATH: string;
  // client
  CLIENT_ID: string;
  CLIENT_SECRET: string;
  COOKIE_SESSION_KEY: string;
  // onelogin
  ISSUER_URL: string;
  REGISTERED_CALLBACK_URL_ROOT: string;
  REGISTERED_CALLBACK_URL_PATH: string;
  REDIRECT_AFTER_LOGOUT_URL: string;
  REFRESH_TOKEN_SECRET: string;
  // identity
  IDENTITY_CLIENT_ID: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET: string;
  IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME: string;
};

class EnvAccessor {
  private static instance: EnvAccessor;
  private data: ProcessEnv = {} as ProcessEnv;

  private constructor() {
    this.readEnv();
  }

  static getInstance(): EnvAccessor {
    if (!this.instance) {
      this.instance = new this();
    }

    return this.instance;
  }

  public validate() {
    Object.entries(this.data)
      .filter(([, val]) => !val)
      .forEach(([key]) => {
        throw Error(`${key} is missing`);
      });
  }

  public getData() {
    return this.data;
  }

  public reReadEnv() {
    this.readEnv();

    return this;
  }

  private readEnv() {
    const {
      NODE_ENV,
      NODE_PORT,
      APPLICATION_PATH,
      CLIENT_ID,
      CLIENT_SECRET,
      COOKIE_SESSION_KEY,
      ISSUER_URL,
      REGISTERED_CALLBACK_URL_ROOT,
      REGISTERED_CALLBACK_URL_PATH,
      REDIRECT_AFTER_LOGOUT_URL,
      REFRESH_TOKEN_SECRET,
      IDENTITY_CLIENT_ID,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
    } = process.env as ProcessEnv;

    this.data = {
      NODE_ENV,
      NODE_PORT,
      APPLICATION_PATH,
      CLIENT_ID,
      CLIENT_SECRET,
      COOKIE_SESSION_KEY,
      ISSUER_URL,
      REGISTERED_CALLBACK_URL_ROOT,
      REGISTERED_CALLBACK_URL_PATH,
      REDIRECT_AFTER_LOGOUT_URL,
      REFRESH_TOKEN_SECRET,
      IDENTITY_CLIENT_ID,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_SECRET,
      IDENTITY_USER_SCOPED_TOKEN_COOKIE_NAME,
    };
  }
}

const envAccessor = EnvAccessor.getInstance();

export type { ProcessEnv };

export { envAccessor, EnvAccessor };
