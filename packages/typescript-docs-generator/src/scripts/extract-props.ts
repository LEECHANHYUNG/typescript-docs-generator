import path from "node:path";
import * as ts from "typescript";
import { loadTSConfig } from "../config";

const getComponentProps = () => {
  const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

  const { options, fileNames } = loadTSConfig(tsConfigPath);
  const buttonFilePath = path.resolve(
    process.cwd(),
    "./src/examples/button.tsx"
  );

  const program = ts.createProgram(fileNames, options);
  const checker = program.getTypeChecker();
  const targetSourceFile = program.getSourceFile(buttonFilePath);

  if (!targetSourceFile) {
    throw new Error("Source file not found");
  }
  targetSourceFile.forEachChild((node) => {
    if (ts.isInterfaceDeclaration(node)) {
      const symbol = checker.getSymbolAtLocation(node.name);
      console.log(`Props for ${node.name.text}:`);
      const type = checker.getDeclaredTypeOfSymbol(symbol!);
      const properties = checker.getPropertiesOfType(type);
      properties.forEach((declaration) => {
        const propType = checker.getTypeOfSymbolAtLocation(
          declaration,
          declaration.valueDeclaration!
        );
        const typeString = checker.typeToString(propType);
        console.log(`- ${declaration.name}: ${typeString}`);
      });
    }
  });
};

getComponentProps();
