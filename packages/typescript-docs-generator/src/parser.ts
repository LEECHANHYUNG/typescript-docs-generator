import ts from "typescript";
import { parseModule } from "./parsers/moduleParser";
export const parseFile = (filePath: string, options: ts.CompilerOptions) => {
  const program = ts.createProgram([filePath], options);
};

export const parseFromProgram = (filePath: string, program: ts.Program) => {
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error("Source file not found");
  }

  return parseModule(sourceFile, checker);
};
