import path from "node:path";
import * as ts from "typescript";
import { loadTSConfig } from "../config";
import { parseFromProgram } from "../parser";

const getComponentProps = () => {
  const tsConfigPath = path.resolve(process.cwd(), "tsconfig.json");

  const { options, fileNames } = loadTSConfig(tsConfigPath);
  const buttonFilePath = path.resolve(
    process.cwd(),
    "./src/examples/button.tsx"
  );

  const program = ts.createProgram(fileNames, options);
  const targetSourceFile = program.getSourceFile(buttonFilePath);

  if (!targetSourceFile) {
    throw new Error("Source file not found");
  }
  parseFromProgram(buttonFilePath, program);
};

getComponentProps();
