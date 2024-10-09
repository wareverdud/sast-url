export type IssuesType = {
    path: string;
    issues: Issue[];
}[];
export type Issue = {
    line: number;
    column: number;
    message: string;
    type: "error" | "warning";
};
//# sourceMappingURL=types.d.ts.map