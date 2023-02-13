import { z } from "zod";
import { codeBox, codeBoxParams } from "./code-box.schema";

export type CodeBox = z.infer<typeof codeBox>;

export type CodeBoxParams = z.infer<typeof codeBoxParams>;
