import ts from "typescript";
import * as tae from "typescript-api-extractor";

export const parseExport = (
  exportSymbol: ts.Symbol,
  context: tae.ParserContext
) => {
  const { checker, sourceFile, parsedSymbolStack } = context;

  try {
    const exportDeclaration = exportSymbol.declarations?.[0];
    if (!exportDeclaration) {
      return;
    }

    if (ts.isTypeAliasDeclaration(exportDeclaration)) {
      console.log("Type Alias Export:", exportSymbol.getName());
    }
  } catch (error) {
    throw error;
  }
};
