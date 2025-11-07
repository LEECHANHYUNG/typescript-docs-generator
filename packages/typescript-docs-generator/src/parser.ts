import ts from "typescript";
import { parseModule } from "./parsers/moduleParser";
import * as tae from "typescript-api-extractor";
export const parseFile = (filePath: string, options: ts.CompilerOptions) => {
  const program = ts.createProgram([filePath], options);
};

export const parseFromProgram = (
  filePath: string,
  program: ts.Program,
  parserOptions: Partial<tae.ParserOptions> = {}
) => {
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error("Source file not found");
  }
  const parseContext = {
    checker,
    sourceFile,
    typeStack: [],
    compilerOptions: program.getCompilerOptions(),
    parsedSymbolStack: [],
    ...getParserOptions(parserOptions),
  };

  return parseModule(sourceFile, parseContext);
};

function getParserOptions(
  parserOptions: Partial<tae.ParserOptions>
): tae.ParserOptions {
  const shouldInclude: tae.ParserOptions["shouldInclude"] = (data) => {
    if (parserOptions.shouldInclude) {
      const result = parserOptions.shouldInclude(data);
      if (result !== undefined) {
        return result;
      }
    }

    return true;
  };

  const shouldResolveObject: tae.ParserOptions["shouldResolveObject"] = (
    data
  ) => {
    if (parserOptions.shouldResolveObject) {
      const result = parserOptions.shouldResolveObject(data);
      if (result !== undefined) {
        return result;
      }
    }

    return data.propertyCount <= 50 && data.depth <= 10;
  };

  return {
    shouldInclude,
    shouldResolveObject,
    includeExternalTypes: parserOptions.includeExternalTypes ?? false,
  };
}
