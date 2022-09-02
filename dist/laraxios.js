var e,t=require("axios");function r(e,t,r,o){Object.defineProperty(e,t,{get:r,set:o,enumerable:!0,configurable:!0})}function o(e){return e&&e.__esModule?e.default:e}let a;var s;e=module.exports,Object.defineProperty(e,"__esModule",{value:!0,configurable:!0}),r(module.exports,"axiosInstance",(()=>c)),r(module.exports,"default",(()=>p)),(s=a||(a={})).GET="get",s.POST="post",s.DELETE="delete";const n=e=>{let t={},r=a.GET;if("post"===e.method||"put"===e.method||"patch"===e.method){const o=(e=>{const t=e=>e instanceof Blob?e:"boolean"==typeof e?e?"1":"0":`${e}`,r=new FormData;return e&&Object.entries(e).forEach((([e,o])=>{Array.isArray(o)?o.forEach(((o,a)=>{r.append(`${e}[${a}]`,t(o))})):r.append(e,t(o))})),r})(e.data);o.append("_method",e.method),t=o,r=a.POST}else"delete"===e.method&&(t={},r=a.DELETE);const o={...e,method:r,params:e.params||{},data:t};return o.baseURL&&(o.baseURL=(e=>{const t=e.baseURL?.trim();if(t?.length&&e.url&&"/"===e.url[0]){const{origin:e}=new URL(t);return`${e}`}return e.baseURL})(e)),o},d=e=>({errorHandler:e=>console.error("LARAVEL API ERROR: "+(e?.response?.statusText||"Unknown")),...e});var l=o(t).create({withCredentials:!0,headers:{Accept:"application/json"}});var u=async e=>{const r=d(e),a=r.errorHandler;delete r.errorHandler;try{return await l.request(n(r))}catch(e){return o(t).isAxiosError(e)&&e.response&&a?(a(e),Promise.resolve(e.response)):Promise.reject(e)}};const c=l;var p=e=>({request:t=>u({...e,...t}),get:(t,r)=>u({url:t,method:"get",...{...e,...r}}),post:(t,r,o)=>u({url:t,data:r,method:"post",...{...e,...o}}),put:(t,r,o)=>u({url:t,data:r,method:"put",...{...e,...o}}),patch:(t,r,o)=>u({url:t,data:r,method:"patch",...{...e,...o}}),delete:(t,r)=>u({url:t,method:"delete",...{...e,...r}}),sanctum:{csrf:t=>t?u({...e,baseURL:"",url:t}):e?.baseURL?u({...e,url:"/sanctum/csrf-cookie"}):void 0}});
//# sourceMappingURL=laraxios.js.map
