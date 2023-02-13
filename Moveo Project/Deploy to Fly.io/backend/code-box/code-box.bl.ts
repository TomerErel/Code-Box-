import * as codeBoxDal from './code-box.dal';
import { CodeBox } from './code-box.types';

export async function getCodeBlocks(): Promise<CodeBox[]> {
    return codeBoxDal.getCodeBlocks();
}

export async function getCodeBlocksByTitle(title: string): Promise<CodeBox | undefined> {
    console.log(title, 'bl')
    return await codeBoxDal.getCodeBlocksByTitle(title);
}