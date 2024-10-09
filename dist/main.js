var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as diff from "diff";
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
    let changeQueue = [];
    const responseMap = new Map();
    const connect = () => {
        let connectUrl = "wss://dev.service.careflame.ru/getconn";
        if (!isSafari()) {
            connectUrl += "/";
        }
        const ws = new WebSocket(connectUrl);
        const state = {
            allowChanges: false,
            currentPath: "",
        };
        const updateFiles = new Map();
        const processQueue = () => {
            if (state.allowChanges) {
                while (changeQueue.length > 0) {
                    const change = changeQueue.shift();
                    console.log("Sending request", change);
                    ws.send(encode(change));
                }
                updateFiles.forEach((request, path) => __awaiter(void 0, void 0, void 0, function* () {
                    const patch = diff.structuredPatch("", "", request.original, request.modified, "", "", {
                        context: 0,
                    });
                    if (patch && patch.hunks.length > 0) {
                        patch.hunks.forEach((hunk) => {
                            hunk.lines = hunk.lines.filter((line) => !line.includes("\\ No newline at end of file"));
                        });
                        const updRequest = {
                            type: "diff",
                            data: {
                                files: [
                                    {
                                        path: path,
                                        status: "upd",
                                        hash: yield hash(request.modified),
                                        hunks: patch.hunks,
                                    },
                                ],
                            },
                        };
                        console.log("Sending request", updRequest);
                        ws.send(encode(updRequest));
                    }
                }));
                updateFiles.clear();
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
                const response = data.data;
                response.forEach((item) => {
                    responseMap.set(item.path, item.issues);
                });
                const responseArray = [];
                responseMap.forEach((value, key) => {
                    responseArray.push({ path: key, issues: value });
                });
                // const filteredResponse = responseArray.filter(
                //   (value) => value.path === state.currentPath
                // );
                const filteredResponse = responseArray.filter((value) => value.path.includes(state.currentPath));
                console.log("Response array", responseArray);
                console.log("Filtered response array", state.currentPath === "" ? responseArray : filteredResponse);
                resultWatcher(responseArray);
                state.allowChanges = true;
                if (processQueueInterval) {
                    clearInterval(processQueueInterval);
                }
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
                if (processQueueInterval) {
                    clearInterval(processQueueInterval);
                }
                processQueueInterval = setInterval(processQueue, 5000);
            }
        });
        ws.onclose = (event) => {
            map.delete(cloneUrl);
            console.log("Disconnected", event);
            if (pingInterval)
                clearInterval(pingInterval);
            if (processQueueInterval)
                clearInterval(processQueueInterval);
            responseMap.clear();
            setTimeout(() => {
                console.log("Reconnecting...");
                connect();
            }, 2000);
        };
        ws.onerror = (event) => console.error("WebSocket Error", event);
        const add = (filePath, originalCode) => __awaiter(void 0, void 0, void 0, function* () {
            const request = {
                type: "diff",
                data: {
                    files: [
                        {
                            path: filePath,
                            status: "add",
                            hash: yield hash(""),
                        },
                    ],
                },
            };
            console.log("Queueing request", request);
            changeQueue.push(request);
            if (!updateFiles.has(filePath)) {
                updateFiles.set(filePath, { original: "", modified: originalCode });
            }
        });
        const update = (filePath, originalCode, modifiedCode) => __awaiter(void 0, void 0, void 0, function* () {
            const fileData = updateFiles.get(filePath);
            if (fileData) {
                fileData.modified = modifiedCode;
            }
            else {
                updateFiles.set(filePath, {
                    original: originalCode,
                    modified: modifiedCode,
                });
            }
        });
        return {
            onChangeCode: (filePath, originalCode, modifiedCode) => __awaiter(void 0, void 0, void 0, function* () {
                state.currentPath = filePath;
                if (modifiedCode) {
                    update(filePath, originalCode, modifiedCode);
                }
                else {
                    add(filePath, originalCode);
                }
            }),
            deleteFile: (filePath) => __awaiter(void 0, void 0, void 0, function* () {
                const request = {
                    type: "diff",
                    data: {
                        files: [
                            {
                                path: filePath,
                                status: "del",
                                hash: yield hash(filePath),
                            },
                        ],
                    },
                };
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
