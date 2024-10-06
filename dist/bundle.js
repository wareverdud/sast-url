var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};function n(){}function o(e,t,n,o,r){for(var i,a=[];t;)a.push(t),i=t.previousComponent,delete t.previousComponent,t=i;a.reverse();for(var s=0,l=a.length,u=0,c=0;s<l;s++){var d=a[s];if(d.removed){if(d.value=e.join(o.slice(c,c+d.count)),c+=d.count,s&&a[s-1].added){var f=a[s-1];a[s-1]=a[s],a[s]=f}}else{if(!d.added&&r){var p=n.slice(u,u+d.count);p=p.map((function(e,t){var n=o[c+t];return n.length>e.length?n:e})),d.value=e.join(p)}else d.value=e.join(n.slice(u,u+d.count));u+=d.count,d.added||(c+=d.count)}}var h=a[l-1];return l>1&&"string"==typeof h.value&&(h.added||h.removed)&&e.equals("",h.value)&&(a[l-2].value+=h.value,a.pop()),a}e.d(t,{Z:()=>b,k:()=>S}),n.prototype={diff:function(e,t){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=r.callback;"function"==typeof r&&(i=r,r={}),this.options=r;var a=this;function s(e){return i?(setTimeout((function(){i(void 0,e)}),0),!0):e}e=this.castInput(e),t=this.castInput(t),e=this.removeEmpty(this.tokenize(e));var l=(t=this.removeEmpty(this.tokenize(t))).length,u=e.length,c=1,d=l+u;r.maxEditLength&&(d=Math.min(d,r.maxEditLength));var f=null!==(n=r.timeout)&&void 0!==n?n:1/0,p=Date.now()+f,h=[{oldPos:-1,lastComponent:void 0}],v=this.extractCommon(h[0],t,e,0);if(h[0].oldPos+1>=u&&v+1>=l)return s([{value:this.join(t),count:t.length}]);var g=-1/0,m=1/0;function y(){for(var n=Math.max(g,-c);n<=Math.min(m,c);n+=2){var r=void 0,i=h[n-1],d=h[n+1];i&&(h[n-1]=void 0);var f=!1;if(d){var p=d.oldPos-n;f=d&&0<=p&&p<l}var y=i&&i.oldPos+1<u;if(f||y){if(r=!y||f&&i.oldPos+1<d.oldPos?a.addToPath(d,!0,void 0,0):a.addToPath(i,void 0,!0,1),v=a.extractCommon(r,t,e,n),r.oldPos+1>=u&&v+1>=l)return s(o(a,r.lastComponent,t,e,a.useLongestToken));h[n]=r,r.oldPos+1>=u&&(m=Math.min(m,n-1)),v+1>=l&&(g=Math.max(g,n+1))}else h[n]=void 0}c++}if(i)!function e(){setTimeout((function(){if(c>d||Date.now()>p)return i();y()||e()}),0)}();else for(;c<=d&&Date.now()<=p;){var w=y();if(w)return w}},addToPath:function(e,t,n,o){var r=e.lastComponent;return r&&r.added===t&&r.removed===n?{oldPos:e.oldPos+o,lastComponent:{count:r.count+1,added:t,removed:n,previousComponent:r.previousComponent}}:{oldPos:e.oldPos+o,lastComponent:{count:1,added:t,removed:n,previousComponent:r}}},extractCommon:function(e,t,n,o){for(var r=t.length,i=n.length,a=e.oldPos,s=a-o,l=0;s+1<r&&a+1<i&&this.equals(t[s+1],n[a+1]);)s++,a++,l++;return l&&(e.lastComponent={count:l,previousComponent:e.lastComponent}),e.oldPos=a,s},equals:function(e,t){return this.options.comparator?this.options.comparator(e,t):e===t||this.options.ignoreCase&&e.toLowerCase()===t.toLowerCase()},removeEmpty:function(e){for(var t=[],n=0;n<e.length;n++)e[n]&&t.push(e[n]);return t},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}},new n;var r=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,i=/\S/,a=new n;a.equals=function(e,t){return this.options.ignoreCase&&(e=e.toLowerCase(),t=t.toLowerCase()),e===t||this.options.ignoreWhitespace&&!i.test(e)&&!i.test(t)},a.tokenize=function(e){for(var t=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),n=0;n<t.length-1;n++)!t[n+1]&&t[n+2]&&r.test(t[n])&&r.test(t[n+2])&&(t[n]+=t[n+2],t.splice(n+1,2),n--);return t};var s=new n;function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function u(e){return function(e){if(Array.isArray(e))return c(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}s.tokenize=function(e){this.options.stripTrailingCr&&(e=e.replace(/\r\n/g,"\n"));var t=[],n=e.split(/(\n|\r\n)/);n[n.length-1]||n.pop();for(var o=0;o<n.length;o++){var r=n[o];o%2&&!this.options.newlineIsToken?t[t.length-1]+=r:(this.options.ignoreWhitespace&&(r=r.trim()),t.push(r))}return t},(new n).tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)},(new n).tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var d=Object.prototype.toString,f=new n;function p(e,t,n,o,r){var i,a;for(t=t||[],n=n||[],o&&(e=o(r,e)),i=0;i<t.length;i+=1)if(t[i]===e)return n[i];if("[object Array]"===d.call(e)){for(t.push(e),a=new Array(e.length),n.push(a),i=0;i<e.length;i+=1)a[i]=p(e[i],t,n,o,r);return t.pop(),n.pop(),a}if(e&&e.toJSON&&(e=e.toJSON()),"object"===l(e)&&null!==e){t.push(e),a={},n.push(a);var s,u=[];for(s in e)e.hasOwnProperty(s)&&u.push(s);for(u.sort(),i=0;i<u.length;i+=1)a[s=u[i]]=p(e[s],t,n,o,s);t.pop(),n.pop()}else a=e;return a}f.useLongestToken=!0,f.tokenize=s.tokenize,f.castInput=function(e){var t=this.options,n=t.undefinedReplacement,o=t.stringifyReplacer,r=void 0===o?function(e,t){return void 0===t?n:t}:o;return"string"==typeof e?e:JSON.stringify(p(e,null,null,r),r,"  ")},f.equals=function(e,t){return n.prototype.equals.call(f,e.replace(/,([\r\n])/g,"$1"),t.replace(/,([\r\n])/g,"$1"))};var h=new n;function v(e,t,n,o,r,i,a){a||(a={}),void 0===a.context&&(a.context=4);var l=function(e,t,n){return s.diff(e,t,n)}(n,o,a);if(l){l.push({value:"",lines:[]});for(var c=[],d=0,f=0,p=[],h=1,v=1,g=function(e){var t=l[e],r=t.lines||t.value.replace(/\n$/,"").split("\n");if(t.lines=r,t.added||t.removed){var i;if(!d){var s=l[e-1];d=h,f=v,s&&(p=a.context>0?y(s.lines.slice(-a.context)):[],d-=p.length,f-=p.length)}(i=p).push.apply(i,u(r.map((function(e){return(t.added?"+":"-")+e})))),t.added?v+=r.length:h+=r.length}else{if(d)if(r.length<=2*a.context&&e<l.length-2){var g;(g=p).push.apply(g,u(y(r)))}else{var m,w=Math.min(r.length,a.context);(m=p).push.apply(m,u(y(r.slice(0,w))));var S={oldStart:d,oldLines:h-d+w,newStart:f,newLines:v-f+w,lines:p};if(e>=l.length-2&&r.length<=a.context){var b=/\n$/.test(n),k=/\n$/.test(o),C=0==r.length&&p.length>S.oldLines;!b&&C&&n.length>0&&p.splice(S.oldLines,0,"\\ No newline at end of file"),(b||C)&&k||p.push("\\ No newline at end of file")}c.push(S),d=0,f=0,p=[]}h+=r.length,v+=r.length}},m=0;m<l.length;m++)g(m);return{oldFileName:e,newFileName:t,oldHeader:r,newHeader:i,hunks:c}}function y(e){return e.map((function(e){return" "+e}))}}h.tokenize=function(e){return e.slice()},h.join=h.removeEmpty=function(e){return e};var g=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,s)}l((o=o.apply(e,t||[])).next())}))};const m=e=>g(void 0,void 0,void 0,(function*(){const t=(new TextEncoder).encode(e),n=yield crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(n)).map((e=>e.toString(16).padStart(2,"0"))).join("")})),y=e=>{const t=JSON.stringify(e),n=(new TextEncoder).encode(t).buffer;return new Blob([n])},w=new Map,S=(e,t,n)=>{let o=null;const r=()=>{let i="wss://dev.service.careflame.ru/getconn";(()=>{const e=navigator.userAgent;return/^((?!chrome|android).)*safari/i.test(e)})()||(i+="/");const a=new WebSocket(i),s={allowChanges:!1};return a.onopen=()=>{console.log("Connected",e),w.set(e,a),a.send(y({type:"link",data:{link:e,auth_token:t}})),o=setInterval((()=>{a.readyState===WebSocket.OPEN&&a.send(y({type:"ping"}))}),1e4)},a.onmessage=o=>g(void 0,void 0,void 0,(function*(){const r=JSON.parse(yield(e=>g(void 0,void 0,void 0,(function*(){if(e.data instanceof Blob){const t=yield e.data.arrayBuffer(),n=(new TextDecoder).decode(t);return JSON.parse(n)}return e.data})))(o));console.log(r),"issues"===r.type&&(n(r.data),s.allowChanges=!0),"error"===r.type&&console.error("Error",r.data),"request"===r.type&&"want_full"===r.data.message&&a.send(y({type:"link",data:{link:e,auth_token:t}})),"request"===r.type&&"want_diff"===r.data.message&&(s.allowChanges=!0)})),a.onclose=t=>{w.delete(e),console.log("Disconnected",t),o&&clearInterval(o),setTimeout((()=>{console.log("Reconnecting..."),r()}),2e3)},a.onerror=e=>console.error("WebSocket Error",e),{onChangeCode:(e,t,n)=>g(void 0,void 0,void 0,(function*(){s.allowChanges&&(n?((e,t,n)=>{g(void 0,void 0,void 0,(function*(){const o=v("","",t,n,"","",{context:0});if(o){o.hunks.forEach((e=>{e.lines=e.lines.filter((e=>!e.includes("\\ No newline at end of file")))}));const t={type:"diff",data:{files:[{path:e,status:"upd",hash:yield m(n),hunks:o.hunks}]}};console.log("Sending request",t),a.readyState===WebSocket.OPEN&&a.send(y(t))}}))})(e,t,n):((e,t)=>{g(void 0,void 0,void 0,(function*(){const n=v("","","",t,"","",{context:0});if(n){n.hunks.forEach((e=>{e.lines=e.lines.filter((e=>!e.includes("\\ No newline at end of file")))}));const o={type:"diff",data:{files:[{path:e,status:"add",hash:yield m("")},{path:e,status:"upd",hash:yield m(t),hunks:n.hunks}]}};console.log("Sending request",o),a.readyState===WebSocket.OPEN&&a.send(y(o))}}))})(e,t))})),deleteFile:e=>g(void 0,void 0,void 0,(function*(){if(!s.allowChanges)return;const t={type:"diff",data:{files:[{path:e,status:"del",hash:yield m(e)}]}};console.log("Sending request",t),a.readyState===WebSocket.OPEN&&a.send(y(t))}))}};return r()},b=e=>{const t=w.get(e);t&&(t.close(),w.delete(e))};var k=t.Z,C=t.k;export{k as disconnect,C as register};