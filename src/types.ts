import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosStatic } from 'axios'

export interface ErrorHandlerCallback<T = unknown, D = any> {
  (error: AxiosError<T, D>): void
}

export interface LaraxiosRequestConfig extends AxiosRequestConfig {
  errorHandler?: undefined | ErrorHandlerCallback
}

export type LaraxiosResponse<T = any, D = any> = AxiosResponse<T, D>

export interface LaraxiosRequest<T = any, D = any> {
  (axios: AxiosStatic, axiosInstance: AxiosInstance, config: LaraxiosRequestConfig): Promise<LaraxiosResponse<T, D>>
}

export type RequestDataValue =
  Array<number | string | boolean | Blob | File>
  | string
  | number
  | boolean
  | Blob
  | File

export type RequestData = { [key: string]: RequestDataValue }

export type FormattedData = { [key: string]: string | Blob | File }

export enum LaravelMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete'
}

export interface GetRequest {
  <T = any, D = any> (url: string, config?: LaraxiosRequestConfig): Promise<LaraxiosResponse<T, D>>;
}

export interface PostRequest {
  <T = any, D = any> (
    url: string,
    data?: RequestData,
    config?: LaraxiosRequestConfig
  ): Promise<LaraxiosResponse<T, D>>;
}

export type DeleteRequest = GetRequest
export type PatchRequest = PostRequest
export type PutRequest = PostRequest

export interface LaraxiosInstance {
  get: GetRequest;

  patch: PatchRequest;

  request (config?: LaraxiosRequestConfig): Promise<LaraxiosResponse>;

  axiosInstance: AxiosInstance;

  post: PostRequest;

  sanctum: { csrf (url?: string): Promise<LaraxiosResponse> };

  delete: DeleteRequest;

  put: PutRequest;
}
