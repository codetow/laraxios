import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LaraxiosRequestConfig extends AxiosRequestConfig {
  errorHandler?: undefined | ErrorHandlerCallback
}

export type LaraxiosResponse = AxiosResponse | undefined

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

export interface ErrorHandlerCallback {
  (error: AxiosError): void
}
