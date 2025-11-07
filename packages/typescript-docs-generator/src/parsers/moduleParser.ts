import ts from "typescript";
import * as tae from "typescript-api-extractor";
import { parseExport } from "./exportParser";
import { ParserContext } from "typescript-api-extractor";

export const parseModule = (
  sourceFile: ts.SourceFile,
  parseContext: ParserContext
) => {
  const { checker, parsedSymbolStack } = parseContext;
  parsedSymbolStack.push(sourceFile.fileName);

  try {
    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!sourceFileSymbol) {
      throw new Error("Source file symbol not found");
    }

    const exportedSymbols = checker.getExportsOfModule(sourceFileSymbol);

    for (const symbol of exportedSymbols) {
      parseExport(symbol, parseContext);
    }
  } catch (error) {
    throw error;
  }
};
