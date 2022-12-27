import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";
export interface LaraxiosRequestConfig extends AxiosRequestConfig {
    errorHandler?: undefined | ErrorHandlerCallback;
}
export interface LaraxiosResponse<T = any, D = any> extends AxiosResponse {
}
export type RequestDataValue = Array<number | string | boolean | Blob> | string | number | boolean | Blob;
export type RequestData = {
    [key: string]: RequestDataValue;
};
export enum LaravelMethod {
    GET = "get",
    POST = "post",
    DELETE = "delete"
}
export interface ErrorHandlerCallback {
    (error: AxiosError<any>): void;
}
declare const _default: (axios: AxiosStatic, configuration?: LaraxiosRequestConfig) => {
    axiosInstance: import("axios").AxiosInstance;
    request(config?: LaraxiosRequestConfig): Promise<import("types").LaraxiosResponse<any, any>>;
    /**
     * GET Request.
     * @param url
     * @param config
     */
    get(url: string, config?: LaraxiosRequestConfig): Promise<import("types").LaraxiosResponse<any, any>>;
    /**
     * POST Request.
     * @param url
     * @param data
     * @param config
     */
    post(url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<import("types").LaraxiosResponse<any, any>>;
    /**
     * PUT Request.
     * @param url
     * @param data
     * @param config
     */
    put(url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<import("types").LaraxiosResponse<any, any>>;
    /**
     * PATCH Request.
     * @param url
     * @param data
     * @param config
     */
    patch(url: string, data?: RequestData, config?: LaraxiosRequestConfig): Promise<import("types").LaraxiosResponse<any, any>>;
    /**
     * DELETE Request.
     * @param url
     * @param config
     */
    delete(url: string, config?: LaraxiosRequestConfig): Promise<import("types").LaraxiosResponse<any, any>>;
    sanctum: {
        /**
         * Send /sanctum/csrf request.
         * @param url
         */
        csrf(url?: string): Promise<import("types").LaraxiosResponse<any, any>>;
    };
};
export default laraxios;

//# sourceMappingURL=types.d.ts.map
