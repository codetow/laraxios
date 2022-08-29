import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
interface LaraxiosRequestConfig extends AxiosRequestConfig {
    errorHandler?: undefined | ErrorHandlerCallback;
}
interface LaraxiosInstance {
    request: (config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
    get: (url: string, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
    post: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
    put: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
    patch: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
    delete: (url: string, data?: RequestData, config?: LaraxiosRequestConfig) => Promise<ApiResponse>;
    sanctum: {
        csrf: (url?: string) => Promise<ApiResponse> | void;
    };
}
type RequestDataValue = Array<number | string | boolean | Blob> | string | number | boolean | Blob;
type RequestData = {
    [key: string]: RequestDataValue;
};
type ApiResponse = AxiosResponse;
interface ErrorHandlerCallback {
    (error: AxiosError): void;
}
declare const _default: (configuration?: LaraxiosRequestConfig) => LaraxiosInstance;
export default _default;

//# sourceMappingURL=types.d.ts.map
