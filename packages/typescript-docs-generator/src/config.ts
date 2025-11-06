import ts from "typescript";
import path from "node:path";
import fs from "node:fs";

export const loadTSConfig = (tsConfigPath: string) => {
  const resovledTSConfigPath = path.resolve(tsConfigPath);
  const projectDirectory = path.dirname(resovledTSConfigPath);

  const { config, error } = ts.readConfigFile(tsConfigPath, (filePath) =>
    fs.readFileSync(filePath).toString()
  );

  if (error) throw error;

  const { options, errors, fileNames } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    projectDirectory
  );

  if (errors.length)
    throw new Error(errors.map((e) => e.messageText).toString());

  return { options, fileNames };
};
