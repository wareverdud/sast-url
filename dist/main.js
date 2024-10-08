var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const hash = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = yield crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
});
const encode = (data) => {
    const jsonString = JSON.stringify(data);
    const buffer = new TextEncoder().encode(jsonString).buffer;
    return new Blob([buffer]);
};
const decode = (event) => __awaiter(void 0, void 0, void 0, function* () {
    if (event.data instanceof Blob) {
        const buffer = yield event.data.arrayBuffer();
        const jsonString = new TextDecoder().decode(buffer);
        const jsonObject = JSON.parse(jsonString);
        return jsonObject;
    }
    else {
        return event.data;
    }
});
const isSafari = () => {
    const ua = navigator.userAgent;
    return /^((?!chrome|android).)*safari/i.test(ua);
};
const map = new Map();
export const register = (cloneUrl, token, resultWatcher) => {
    let pingInterval = null;
    let processQueueInterval = null;
    const changeQueue = [];
    const connect = () => {
        let connectUrl = "wss://dev.service.careflame.ru/getconn";
        if (!isSafari()) {
            connectUrl += "/";
        }
        const ws = new WebSocket(connectUrl);
        const state = {
            allowChanges: false,
        };
        const processQueue = () => {
            console.log(changeQueue);
            if (state.allowChanges) {
                while (changeQueue.length > 0) {
                    const change = changeQueue.shift();
                    console.log("Sending request", change);
                    ws.send(encode(change));
                }
            }
        };
        ws.onopen = () => {
            console.log("Connected", cloneUrl);
            map.set(cloneUrl, ws);
            ws.send(encode({
                type: "link",
                data: {
                    link: cloneUrl,
                    auth_token: token,
                },
            }));
            pingInterval = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(encode({ type: "ping" }));
                }
            }, 10000);
        };
        ws.onmessage = (event) => __awaiter(void 0, void 0, void 0, function* () {
            const data = JSON.parse(yield decode(event));
            console.log(data);
            if (data.type === "issues") {
                resultWatcher(data.data);
                state.allowChanges = true;
                processQueueInterval = setInterval(processQueue, 5000);
            }
            if (data.type === "error") {
                console.error("Error", data.data);
            }
            if (data.type === "request" && data.data.message === "want_full") {
                ws.send(encode({
                    type: "link",
                    data: {
                        link: cloneUrl,
                        auth_token: token,
                    },
                }));
            }
            if (data.type === "request" && data.data.message === "want_diff") {
                state.allowChanges = true;
                processQueueInterval = setInterval(processQueue, 5000);
            }
        });
        ws.onclose = (event) => {
            map.delete(cloneUrl);
            console.log("Disconnected", event);
            if (pingInterval)
                clearInterval(pingInterval);
            setTimeout(() => {
                console.log("Reconnecting...");
                connect();
            }, 2000);
        };
        ws.onerror = (event) => console.error("WebSocket Error", event);
        const add = (filePath, originalCode) => __awaiter(void 0, void 0, void 0, function* () {
            const request = {
                path: filePath,
                status: "add",
                hash: yield hash(""),
            };
            const updRequest = {
                originalCode: "",
                modifiedCode: originalCode,
                path: filePath,
                status: "upd",
            };
            console.log("Queueing request", request);
            changeQueue.push(request);
            console.log("Queueing request", updRequest);
            changeQueue.push(updRequest);
            // const patch = diff.structuredPatch("", "", "", originalCode, "", "", {
            //   context: 0,
            // });
            // if (patch && patch.hunks.length > 0) {
            //   patch.hunks.forEach((hunk) => {
            //     hunk.lines = hunk.lines.filter(
            //       (line) => !line.includes("\\ No newline at end of file")
            //     );
            //   });
            //   const addRequest = {
            //     type: "diff",
            //     data: {
            //       files: [
            //         {
            //           path: filePath,
            //           status: "add",
            //           hash: await hash(""),
            //         },
            //         {
            //           path: filePath,
            //           status: "upd",
            //           hash: await hash(originalCode),
            //           hunks: patch.hunks,
            //         },
            //       ],
            //     },
            //   };
            //   console.log("Queueing request", addRequest);
            //   changeQueue.push(addRequest);
            // }
        });
        const update = (filePath, originalCode, modifiedCode) => __awaiter(void 0, void 0, void 0, function* () {
            const request = {
                originalCode: originalCode,
                modifiedCode: modifiedCode,
                path: filePath,
                status: "upd",
            };
            console.log("Queueing request", request);
            changeQueue.push(request);
            // const patch = diff.structuredPatch(
            //   "",
            //   "",
            //   originalCode,
            //   modifiedCode,
            //   "",
            //   "",
            //   {
            //     context: 0,
            //   }
            // );
            // if (patch && patch.hunks.length > 0) {
            //   patch.hunks.forEach((hunk) => {
            //     hunk.lines = hunk.lines.filter(
            //       (line) => !line.includes("\\ No newline at end of file")
            //     );
            //   });
            //   const updRequest = {
            //     type: "diff",
            //     data: {
            //       files: [
            //         {
            //           path: filePath,
            //           status: "upd",
            //           hash: await hash(modifiedCode),
            //           hunks: patch.hunks,
            //         },
            //       ],
            //     },
            //   };
            //   console.log("Queueing request", updRequest);
            //   changeQueue.push(updRequest);
            // }
        });
        return {
            onChangeCode: (filePath, originalCode, modifiedCode) => __awaiter(void 0, void 0, void 0, function* () {
                if (modifiedCode) {
                    update(filePath, originalCode, modifiedCode);
                }
                else {
                    add(filePath, originalCode);
                }
            }),
            deleteFile: (filePath) => __awaiter(void 0, void 0, void 0, function* () {
                const request = {
                    path: filePath,
                    status: "del",
                    hash: yield hash(filePath),
                };
                // const request = {
                //   type: "diff",
                //   data: {
                //     files: [
                //       {
                //         path: filePath,
                //         status: "del",
                //         hash: await hash(filePath),
                //       },
                //     ],
                //   },
                // };
                console.log("Queueing request", request);
                changeQueue.push(request);
            }),
        };
    };
    return connect();
};
export const disconnect = (cloneUrl) => {
    const ws = map.get(cloneUrl);
    if (ws) {
        ws.close();
        map.delete(cloneUrl);
    }
};
