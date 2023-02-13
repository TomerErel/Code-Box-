import express from 'express';
import { getCodeBlocks, getCodeBlocksByTitle } from './code-box.bl';
import { CodeBox, CodeBoxParams } from './code-box.types';
import * as schema from './code-box.schema';
import { NotFoundError } from '../errors';

export const codeBoxRouter = express.Router();

codeBoxRouter.get<{}, CodeBox[]>('/', async (req, res, next) => {
    try {
        const blocks = await getCodeBlocks();
        return res.status(200).json(blocks);
    } catch (err) {
        next(err);
    }
});

codeBoxRouter.get<CodeBoxParams, CodeBox>('/:title', async (req, res, next) => {
    try {
        const { title } = schema.codeBoxParams.parse(req.params)
        const blocks = await getCodeBlocksByTitle(title);
        if (!blocks) {
            throw new NotFoundError('The code you are looking for does not exist');
        }
        return res.status(200).json(blocks);
    } catch (err) {
        next(err);
    }
});
