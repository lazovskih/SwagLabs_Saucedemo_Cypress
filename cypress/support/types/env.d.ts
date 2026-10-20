export interface CustomCypressEnv {
  username?: string;
  password?: string;
  BASE_URL?: string;
  [key: string]: unknown;
}
