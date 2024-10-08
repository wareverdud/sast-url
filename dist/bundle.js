var e={d:(n,t)=>{for(var o in t)e.o(t,o)&&!e.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)},n={};function t(){}function o(e,n,t,o,r){for(var i,a=[];n;)a.push(n),i=n.previousComponent,delete n.previousComponent,n=i;a.reverse();for(var s=0,l=a.length,u=0,c=0;s<l;s++){var d=a[s];if(d.removed){if(d.value=e.join(o.slice(c,c+d.count)),c+=d.count,s&&a[s-1].added){var f=a[s-1];a[s-1]=a[s],a[s]=f}}else{if(!d.added&&r){var p=t.slice(u,u+d.count);p=p.map((function(e,n){var t=o[c+n];return t.length>e.length?t:e})),d.value=e.join(p)}else d.value=e.join(t.slice(u,u+d.count));u+=d.count,d.added||(c+=d.count)}}var h=a[l-1];return l>1&&"string"==typeof h.value&&(h.added||h.removed)&&e.equals("",h.value)&&(a[l-2].value+=h.value,a.pop()),a}e.d(n,{Z:()=>C,k:()=>w}),t.prototype={diff:function(e,n){var t,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=r.callback;"function"==typeof r&&(i=r,r={}),this.options=r;var a=this;function s(e){return i?(setTimeout((function(){i(void 0,e)}),0),!0):e}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e));var l=(n=this.removeEmpty(this.tokenize(n))).length,u=e.length,c=1,d=l+u;r.maxEditLength&&(d=Math.min(d,r.maxEditLength));var f=null!==(t=r.timeout)&&void 0!==t?t:1/0,p=Date.now()+f,h=[{oldPos:-1,lastComponent:void 0}],v=this.extractCommon(h[0],n,e,0);if(h[0].oldPos+1>=u&&v+1>=l)return s([{value:this.join(n),count:n.length}]);var g=-1/0,m=1/0;function y(){for(var t=Math.max(g,-c);t<=Math.min(m,c);t+=2){var r=void 0,i=h[t-1],d=h[t+1];i&&(h[t-1]=void 0);var f=!1;if(d){var p=d.oldPos-t;f=d&&0<=p&&p<l}var y=i&&i.oldPos+1<u;if(f||y){if(r=!y||f&&i.oldPos+1<d.oldPos?a.addToPath(d,!0,void 0,0):a.addToPath(i,void 0,!0,1),v=a.extractCommon(r,n,e,t),r.oldPos+1>=u&&v+1>=l)return s(o(a,r.lastComponent,n,e,a.useLongestToken));h[t]=r,r.oldPos+1>=u&&(m=Math.min(m,t-1)),v+1>=l&&(g=Math.max(g,t+1))}else h[t]=void 0}c++}if(i)!function e(){setTimeout((function(){if(c>d||Date.now()>p)return i();y()||e()}),0)}();else for(;c<=d&&Date.now()<=p;){var w=y();if(w)return w}},addToPath:function(e,n,t,o){var r=e.lastComponent;return r&&r.added===n&&r.removed===t?{oldPos:e.oldPos+o,lastComponent:{count:r.count+1,added:n,removed:t,previousComponent:r.previousComponent}}:{oldPos:e.oldPos+o,lastComponent:{count:1,added:n,removed:t,previousComponent:r}}},extractCommon:function(e,n,t,o){for(var r=n.length,i=t.length,a=e.oldPos,s=a-o,l=0;s+1<r&&a+1<i&&this.equals(n[s+1],t[a+1]);)s++,a++,l++;return l&&(e.lastComponent={count:l,previousComponent:e.lastComponent}),e.oldPos=a,s},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}},new t;var r=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,i=/\S/,a=new t;a.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!i.test(e)&&!i.test(n)},a.tokenize=function(e){for(var n=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&r.test(n[t])&&r.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n};var s=new t;function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function u(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return c(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?c(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,o=new Array(n);t<n;t++)o[t]=e[t];return o}s.tokenize=function(e){this.options.stripTrailingCr&&(e=e.replace(/\r\n/g,"\n"));var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var o=0;o<t.length;o++){var r=t[o];o%2&&!this.options.newlineIsToken?n[n.length-1]+=r:(this.options.ignoreWhitespace&&(r=r.trim()),n.push(r))}return n},(new t).tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)},(new t).tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var d=Object.prototype.toString,f=new t;function p(e,n,t,o,r){var i,a;for(n=n||[],t=t||[],o&&(e=o(r,e)),i=0;i<n.length;i+=1)if(n[i]===e)return t[i];if("[object Array]"===d.call(e)){for(n.push(e),a=new Array(e.length),t.push(a),i=0;i<e.length;i+=1)a[i]=p(e[i],n,t,o,r);return n.pop(),t.pop(),a}if(e&&e.toJSON&&(e=e.toJSON()),"object"===l(e)&&null!==e){n.push(e),a={},t.push(a);var s,u=[];for(s in e)e.hasOwnProperty(s)&&u.push(s);for(u.sort(),i=0;i<u.length;i+=1)a[s=u[i]]=p(e[s],n,t,o,s);n.pop(),t.pop()}else a=e;return a}f.useLongestToken=!0,f.tokenize=s.tokenize,f.castInput=function(e){var n=this.options,t=n.undefinedReplacement,o=n.stringifyReplacer,r=void 0===o?function(e,n){return void 0===n?t:n}:o;return"string"==typeof e?e:JSON.stringify(p(e,null,null,r),r,"  ")},f.equals=function(e,n){return t.prototype.equals.call(f,e.replace(/,([\r\n])/g,"$1"),n.replace(/,([\r\n])/g,"$1"))};var h=new t;h.tokenize=function(e){return e.slice()},h.join=h.removeEmpty=function(e){return e};var v=function(e,n,t,o){return new(t||(t=Promise))((function(r,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var n;e.done?r(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}l((o=o.apply(e,n||[])).next())}))};const g=e=>v(void 0,void 0,void 0,(function*(){const n=(new TextEncoder).encode(e),t=yield crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(t)).map((e=>e.toString(16).padStart(2,"0"))).join("")})),m=e=>{const n=JSON.stringify(e),t=(new TextEncoder).encode(n).buffer;return new Blob([t])},y=new Map,w=(e,n,t)=>{let o=null,r=null,i=[];const a=()=>{let l="wss://dev.service.careflame.ru/getconn";(()=>{const e=navigator.userAgent;return/^((?!chrome|android).)*safari/i.test(e)})()||(l+="/");const c=new WebSocket(l),d={allowChanges:!1},f=new Map;setTimeout((()=>{console.log(d.allowChanges),d.allowChanges=!0,r=setInterval(p,5e3),console.log(d.allowChanges)}),5e3);const p=()=>{if(d.allowChanges){for(i.length>0&&console.log(i);i.length>0;){const e=i.shift();console.log("Sending request",e),c.send(m(e))}console.log(f),f.forEach(((e,n)=>v(void 0,void 0,void 0,(function*(){const t=function(e,n,t,o,r,i,a){a||(a={}),void 0===a.context&&(a.context=4);var l=function(e,n,t){return s.diff(e,n,t)}(t,o,a);if(l){l.push({value:"",lines:[]});for(var c=[],d=0,f=0,p=[],h=1,v=1,g=function(e){var n=l[e],r=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=r,n.added||n.removed){var i;if(!d){var s=l[e-1];d=h,f=v,s&&(p=a.context>0?y(s.lines.slice(-a.context)):[],d-=p.length,f-=p.length)}(i=p).push.apply(i,u(r.map((function(e){return(n.added?"+":"-")+e})))),n.added?v+=r.length:h+=r.length}else{if(d)if(r.length<=2*a.context&&e<l.length-2){var g;(g=p).push.apply(g,u(y(r)))}else{var m,w=Math.min(r.length,a.context);(m=p).push.apply(m,u(y(r.slice(0,w))));var C={oldStart:d,oldLines:h-d+w,newStart:f,newLines:v-f+w,lines:p};if(e>=l.length-2&&r.length<=a.context){var b=/\n$/.test(t),S=/\n$/.test(o),k=0==r.length&&p.length>C.oldLines;!b&&k&&t.length>0&&p.splice(C.oldLines,0,"\\ No newline at end of file"),(b||k)&&S||p.push("\\ No newline at end of file")}c.push(C),d=0,f=0,p=[]}h+=r.length,v+=r.length}},m=0;m<l.length;m++)g(m);return{oldFileName:e,newFileName:n,oldHeader:r,newHeader:i,hunks:c}}function y(e){return e.map((function(e){return" "+e}))}}("","",e.original,e.modified,"","",{context:0});if(t&&t.hunks.length>0){t.hunks.forEach((e=>{e.lines=e.lines.filter((e=>!e.includes("\\ No newline at end of file")))}));const o={type:"diff",data:{files:[{path:n,status:"upd",hash:yield g(e.modified),hunks:t.hunks}]}};console.log("Sending request",o),c.send(m(o))}})))),f.clear()}};return c.onopen=()=>{console.log("Connected",e),y.set(e,c),c.send(m({type:"link",data:{link:e,auth_token:n}})),o=setInterval((()=>{c.readyState===WebSocket.OPEN&&c.send(m({type:"ping"}))}),1e4)},c.onmessage=o=>v(void 0,void 0,void 0,(function*(){const i=JSON.parse(yield(e=>v(void 0,void 0,void 0,(function*(){if(e.data instanceof Blob){const n=yield e.data.arrayBuffer(),t=(new TextDecoder).decode(n);return JSON.parse(t)}return e.data})))(o));console.log(i),"issues"===i.type&&(t(i.data),d.allowChanges=!0,r=setInterval(p,5e3)),"error"===i.type&&console.error("Error",i.data),"request"===i.type&&"want_full"===i.data.message&&c.send(m({type:"link",data:{link:e,auth_token:n}})),"request"===i.type&&"want_diff"===i.data.message&&(d.allowChanges=!0,r=setInterval(p,5e3))})),c.onclose=n=>{y.delete(e),console.log("Disconnected",n),o&&clearInterval(o),r&&clearInterval(r),setTimeout((()=>{console.log("Reconnecting..."),a()}),2e3)},c.onerror=e=>console.error("WebSocket Error",e),{onChangeCode:(e,n,t)=>v(void 0,void 0,void 0,(function*(){t?((e,n,t)=>{v(void 0,void 0,void 0,(function*(){const o=f.get(e);o?o.modified=t:f.set(e,{original:n,modified:t})}))})(e,n,t):((e,n)=>{v(void 0,void 0,void 0,(function*(){const t={type:"diff",data:{files:[{path:e,status:"add",hash:yield g("")}]}};console.log("Queueing request",t),i.push(t),f.has(e)||f.set(e,{original:"",modified:n})}))})(e,n)})),deleteFile:e=>v(void 0,void 0,void 0,(function*(){const n={type:"diff",data:{files:[{path:e,status:"del",hash:yield g(e)}]}};console.log("Queueing request",n),i.push(n)}))}};return a()},C=e=>{const n=y.get(e);n&&(n.close(),y.delete(e))};var b=n.Z,S=n.k;export{b as disconnect,S as register};