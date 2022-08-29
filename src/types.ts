import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LaraxiosRequestConfig extends AxiosRequestConfig {
  errorHandler?: undefined | ErrorHandlerCallback
}

export interface LaraxiosInstance {
  request: (config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
  get: (url: string, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
  post: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
  put: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
  patch: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
  delete: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
  sanctum: {
    csrf: (url?: string) => Promise<ApiResponse> | void
  }
}

export type RequestDataValue =
  Array<number | string | boolean | Blob>
  | string
  | number
  | boolean
  | Blob

export type RequestData = { [key: string]: RequestDataValue }

export enum LaravelMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete'
}

export type ApiResponse = AxiosResponse

export interface ErrorHandlerCallback {
  (error: AxiosError): void
}
