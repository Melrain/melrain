// types/api-result.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
