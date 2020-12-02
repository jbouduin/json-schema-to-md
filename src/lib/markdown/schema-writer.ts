/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { EHeaderAttribute } from "../schema/header-attribute.enum";
import { Schema } from "../schema/schema";
import { ESchemaAttribute } from "../schema/schema-attribute.enum";
import { IHeaderAttributeFormatter } from "./header-attribute-formatter";
import { IMarkDownWriter } from "./markdown-writer";

export interface ISchemaWriter {
  write(schema: Schema): void;
}

export class SchemaWriter implements ISchemaWriter {

  //#region private properties
  private headerAttributeFormatter: IHeaderAttributeFormatter;
  private writer: IMarkDownWriter;
  //#endregion

  //#region constructor
  public constructor(writer: IMarkDownWriter, headerAttributeFormatter: IHeaderAttributeFormatter) {
    this.headerAttributeFormatter = headerAttributeFormatter;
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
      ...this.getAttributes(schema),
      ...this.getDefault(schema),
      ...this.getExamples(schema),
      ...this.getDefinitions(schema),
      ...this.getProperties(schema)
    ];
  }

  private getAttributes(schema: Schema): Array<string> {
    return [
      '## Schema attributes',
      ...this.headerAttributeFormatter.getHorizontalAttributeTable(
        schema,
        [
          EHeaderAttribute.ABSTRACT,
          EHeaderAttribute.STATUS,
          EHeaderAttribute.EXTENSIBLE,
          EHeaderAttribute.ADDITIONAL_PROPERTIES,
          EHeaderAttribute.READ_ONLY,
          EHeaderAttribute.WRITE_ONLY
        ])
    ];
  }

  private getDefinitions(schema: Schema): Array<string> {
    const result = new Array<string>();
    if (schema.property(ESchemaAttribute.DEFINITIONS)) {
      result.push('## Definitions')
    }
    return result;
  }

  private getDefault(schema: Schema): Array<string> {
    if (schema.property(ESchemaAttribute.DEFAULT)){
      return [
        '## Default',
        '```json',
        JSON.stringify(schema.property(ESchemaAttribute.DEFAULT), undefined, 2),
        '```',
      ];
    } else {
      return [];
    }
  }

  private getProperties(schema: Schema): Array<string> {
    const result = new Array<string>();
    if (schema.property(ESchemaAttribute.PROPERTIES)) {
      result.push('## Properties');
    }
    return result;
  }

  private getExamples(schema: Schema): Array<string> {
    const examples = schema.property(ESchemaAttribute.EXAMPLES) as Array<unknown>;
    if (examples) {
      const result = new Array<string>();
      result.push('## Examples');
      examples.forEach(example => result.push('```json', JSON.stringify(example, undefined, 2), '```'));
      return result;
    } else {
      return [];
    }
  }
  //#endregion
}