export declare const register: (cloneUrl: string, token: string, resultWatcher: (issues: any) => void) => {
    onChangeCode: (filePath: string, originalCode: string, modifiedCode?: string) => Promise<void>;
    deleteFile: (filePath: string) => Promise<void>;
};
export declare const disconnect: (cloneUrl: string) => void;
//# sourceMappingURL=main.d.ts.map