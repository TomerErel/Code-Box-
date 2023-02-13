import { asyncQuery } from "../db";
import { CodeBox } from "./code-box.types";

export async function getCodeBlocks() {
    const sql = `SELECT * FROM moveo.codes`;
    return asyncQuery<CodeBox[]>(sql, []);
}

export async function getCodeBlocksByTitle(title: string) {
    console.log(title, 'dal')
    const sql = "SELECT * FROM moveo.codes WHERE title = ?";
    return asyncQuery<CodeBox>(sql, [title]);
}

