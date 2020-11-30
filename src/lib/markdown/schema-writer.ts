import { Schema } from "../schema/schema";
import { IMarkDownWriter } from "./markdown-writer";

export interface ISchemaWriter {
  write(schema: Schema): void;
}

export class SchemaWriter implements ISchemaWriter {

  //#region private properties
  private writer: IMarkDownWriter;
  //#endregion

  //#region constructor
  public constructor(writer: IMarkDownWriter) {
    this.writer = writer;
  }
  //#endregion

  //#region ISchemaWriter interface methods
  public write(schema: Schema): void {
    // console.log('building readme');

    const readmeMdAst = this.buildMarkdown(schema);
    this.writer.writeFile(`${schema.directory}/${schema.slug}.md`, readmeMdAst)
  }
  //#endregion

  //#region private methods
  private buildMarkdown(schema: Schema): Array<string> {
    const result = new Array<string>();
    result.push(`# ${schema.title}`);
    result.push('```txt');
    result.push(schema.$id);
    result.push('```');
    result.push(schema.description);

    return result;
  }
  //#endregion

}