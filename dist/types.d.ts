export type IssuesType = [
    {
        path: string;
        issues: [
            {
                line: number;
                column: number;
                message: string;
                type: "error" | "warning";
            }
        ];
    }
];
//# sourceMappingURL=types.d.ts.map