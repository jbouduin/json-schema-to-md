import fs from 'fs';
import path from "path";

export interface IMarkDownWriter {
  writeFile(fileName: string, markDown: Array<string>): void;
}

export class MarkDownWriter implements IMarkDownWriter {

  //#region private properties
  private rootDir: string;
  //#endregion

  //#region constructor
  public constructor(rootDir: string) {
    this.rootDir = rootDir;
  }
  //#endregion

  //#region IMarkDownWriter interface methods
  public writeFile(fileName: string, markDown: Array<string>): void {
    const fullPath = path.resolve(this.rootDir, fileName);
    const outputDir = path.dirname(fullPath);

    if (!fs.existsSync(outputDir)) {
      console.log('creating directory', outputDir);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('writing markdown file', fullPath);
    fs.writeFile(
      fullPath,
      markDown.join('\r\n'),
      (err) => {
        if (err) {
          console.error(err);
        }
      });
  }
  //#endregion
}