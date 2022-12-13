function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $19cba8869f611cea$export$2e2bcd8739ae039);
let $faefaad95e5fcca0$export$440ca1817514db88;
(function(LaravelMethod) {
    LaravelMethod["GET"] = "get";
    LaravelMethod["POST"] = "post";
    LaravelMethod["DELETE"] = "delete";
})($faefaad95e5fcca0$export$440ca1817514db88 || ($faefaad95e5fcca0$export$440ca1817514db88 = {}));


const $9ba0f9a5c47c04f2$export$b1ef46223b559f9d = (config)=>{
    const baseURL = config.baseURL?.trim();
    if (baseURL?.length && config.url && config.url[0] === "/") {
        const { origin: origin  } = new URL(baseURL);
        return `${origin}`;
    }
    return config.baseURL;
};
const $9ba0f9a5c47c04f2$export$697572e6b3df3226 = (data)=>{
    /**
   * Change the type of data.
   * @param val
   */ const changeType = (val)=>{
        if (val instanceof Blob) return val;
        else if (typeof val === "boolean") return val ? "1" : "0";
        else return `${val}`;
    };
    const formData = new FormData();
    if (data) Object.entries(data).forEach(([key, value])=>{
        // Iterate if array
        if (Array.isArray(value)) value.forEach((val, index)=>{
            formData.append(`${key}[${index}]`, changeType(val));
        });
        else formData.append(key, changeType(value));
    });
    return formData;
};
const $9ba0f9a5c47c04f2$export$425a08012e9acdfa = (config)=>{
    let data = {};
    let method = (0, $faefaad95e5fcca0$export$440ca1817514db88).GET;
    // Set data according to the method...
    if (config.method === "post" || config.method === "put" || config.method === "patch") {
        const formData = $9ba0f9a5c47c04f2$export$697572e6b3df3226(config.data);
        // Laravel uses this field to recognize put and patch...
        formData.append("_method", config.method);
        data = formData;
        method = (0, $faefaad95e5fcca0$export$440ca1817514db88).POST;
    } else if (config.method === "delete") {
        data = {};
        method = (0, $faefaad95e5fcca0$export$440ca1817514db88).DELETE;
    }
    const newConfig = {
        ...config,
        method: method,
        params: config.params || {},
        data: data
    };
    if (newConfig.baseURL) newConfig.baseURL = $9ba0f9a5c47c04f2$export$b1ef46223b559f9d(config);
    return newConfig;
};
const $9ba0f9a5c47c04f2$export$7ec1ebcfa9d8bd6a = (config)=>{
    return {
        errorHandler: (error)=>console.error("LARAVEL API ERROR: " + (error?.response?.statusText || "Unknown")),
        ...config
    };
};


/**
 * Base request.
 * @param axios
 * @param axiosInstance
 * @param config
 */ const $b316306660403ad7$var$request = async (axios, axiosInstance, config)=>{
    const c = (0, $9ba0f9a5c47c04f2$export$7ec1ebcfa9d8bd6a)(config);
    // Get the error handler and then remove it from the config...
    const errorHandler = c.errorHandler;
    delete c.errorHandler;
    try {
        return await axiosInstance.request((0, $9ba0f9a5c47c04f2$export$425a08012e9acdfa)(c));
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && errorHandler) {
            // Invoke error handler...
            errorHandler(error);
            // Resolve with error, since the error has been handled...
            return Promise.resolve(error.response);
        }
        return Promise.reject(error);
    }
};
var $b316306660403ad7$export$2e2bcd8739ae039 = $b316306660403ad7$var$request;


var $19cba8869f611cea$export$2e2bcd8739ae039 = (axios, configuration)=>({
        axiosInstance: axios.create({
            withCredentials: true,
            headers: {
                Accept: "application/json"
            }
        }),
        request (config) {
            return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                ...configuration,
                ...config
            });
        },
        /**
   * GET Request.
   * @param url
   * @param config
   */ get (url, config) {
            return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                method: "get",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * POST Request.
   * @param url
   * @param data
   * @param config
   */ post (url, data, config) {
            return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                data: data,
                method: "post",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * PUT Request.
   * @param url
   * @param data
   * @param config
   */ put (url, data, config) {
            return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                data: data,
                method: "put",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * PATCH Request.
   * @param url
   * @param data
   * @param config
   */ patch (url, data, config) {
            return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                data: data,
                method: "patch",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        /**
   * DELETE Request.
   * @param url
   * @param config
   */ delete (url, config) {
            return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                url: url,
                method: "delete",
                ...{
                    ...configuration,
                    ...config
                }
            });
        },
        sanctum: {
            /**
     * Send /sanctum/csrf request.
     * @param url
     */ csrf (url) {
                if (url) return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                    ...configuration,
                    baseURL: "",
                    url: url
                });
                if (configuration?.baseURL) return (0, $b316306660403ad7$export$2e2bcd8739ae039)(axios, this.axiosInstance, {
                    ...configuration,
                    url: "/sanctum/csrf-cookie"
                });
            }
        }
    });


//# sourceMappingURL=laraxios.js.map
