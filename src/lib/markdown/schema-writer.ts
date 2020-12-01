/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Schema } from "../schema/schema";
import { ESchemaAttribute } from "../schema/schema-attribute-enum";
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
    const readme = this.buildMarkdown(schema);
    this.writer.writeFile(`${schema.directory}/${schema.slug}.md`, readme)
  }
  //#endregion

  //#region private methods
  private buildMarkdown(schema: Schema): Array<string> {
    return [
      `# ${schema.property(ESchemaAttribute.TITLE)}`,
      '```txt',
      schema.property(ESchemaAttribute.ID) as string,
      '```',
      schema.property(ESchemaAttribute.DESCRIPTION) as string,
      ...this.getAttributes(),
      ...this.getDefinitions(schema),
      ...this.getProperties(schema)
    ];
  }

  private getAttributes(): Array<string> {
    const result = new Array<string>();
    result.push('## Schema attributes')
    return result;
  }

  private getDefinitions(schema: Schema): Array<string> {
    const result = new Array<string>();
    if (schema.property(ESchemaAttribute.DEFINITIONS)) {
      result.push('## Definitions')
    }
    return result;
  }

  private getProperties(schema: Schema): Array<string> {
    const result = new Array<string>();
    if (schema.property(ESchemaAttribute.PROPERTIES)) {
      result.push('## Properties');
    }
    return result;
  }
  //#endregion
}