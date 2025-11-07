import ts from "typescript";

export const parseModule = (
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker
) => {
  try {
    const sourceFileSymbol = checker.getSymbolAtLocation(sourceFile);
    if (!sourceFileSymbol) {
      throw new Error("Source file symbol not found");
    }

    let parsedModuleExports = [];
    const exportedSymbols = checker.getExportsOfModule(sourceFileSymbol);
    for (const symbol of exportedSymbols) {
      console.log("Exported symbol:", symbol.getName());
    }
  } catch (error) {
    throw error;
  }
};
