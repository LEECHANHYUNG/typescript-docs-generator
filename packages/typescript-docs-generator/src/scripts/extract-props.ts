import path from "node:path";
import { fileURLToPath } from "node:url";
import * as ts from "typescript";

const getComponentProps = () => {
  const __dirName = process.cwd();

  const buttonFilePath = path.resolve(__dirName, "src/examples/button.tsx");

  const configPath = ts.findConfigFile(
    __dirName,
    ts.sys.fileExists,
    "tsconfig.json"
  );
  const configFile = ts.readConfigFile(configPath!, ts.sys.readFile);
  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath!)
  );
  const program = ts.createProgram([buttonFilePath], parsedConfig.options);
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
