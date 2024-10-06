import { IssuesType } from "./types";
export declare const register: (cloneUrl: string, token: string, resultWatcher: (issues: IssuesType) => void) => {
    onChangeCode: (filePath: string, originalCode: string, modifiedCode?: string) => Promise<void>;
    deleteFile: (filePath: string) => Promise<void>;
};
export declare const disconnect: (cloneUrl: string) => void;
//# sourceMappingURL=main.d.ts.map