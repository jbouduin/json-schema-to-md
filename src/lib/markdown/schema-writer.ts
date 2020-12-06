/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Schema } from "../schema/schema";
import { ESchemaAttribute } from "../schema/schema-attribute.enum";
import { IAttributeFormatter } from "./attribute-formatter";
import { IMarkDownWriter } from "./markdown-writer";
import { IPropertyFormatter } from "./property-formatter";
import { ISchemaFormatter } from "./schema-formatter";

export interface ISchemaWriter {
  write(schema: Schema): void;
}

export class SchemaWriter implements ISchemaWriter {

  //#region private properties
  private readonly attributeFormatter: IAttributeFormatter;
  private readonly propertyFormatter: IPropertyFormatter;
  private readonly schemaFormatter: ISchemaFormatter;
  private readonly writer: IMarkDownWriter;

  //#endregion

  //#region constructor
  public constructor(writer: IMarkDownWriter, schemaFormatter: ISchemaFormatter, attributeFormatter: IAttributeFormatter, propertyFormatter: IPropertyFormatter) {
    this.attributeFormatter = attributeFormatter;
    this.writer = writer;
    this.propertyFormatter = propertyFormatter;
    this.schemaFormatter = schemaFormatter;
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
    return new Array<string>(
      `# ${schema.property(ESchemaAttribute.TITLE)}`,
      '```txt',
      schema.property(ESchemaAttribute.ID) as string,
      '```',
      schema.property(ESchemaAttribute.DESCRIPTION) as string,
      ...this.getAttributes(schema),
      ...this.schemaFormatter.getDefault(schema),
      ...this.schemaFormatter.getExamples(schema),
      ...this.getDefinitions(schema),
      ...this.getProperties(schema)
    );
  }

  private getAttributes(schema: Schema): Array<string> {
    return new Array<string>(
      '## Schema attributes',
      ...this.attributeFormatter.getAttributeValuesAsHorizontalTable(
        schema,
        [
          ESchemaAttribute.PSEUDO_ABSTRACT,
          ESchemaAttribute.PSEUDO_STATUS,
          ESchemaAttribute.EXTENSIBLE,
          ESchemaAttribute.ADDITIONAL_PROPERTIES,
          ESchemaAttribute.READ_ONLY,
          ESchemaAttribute.WRITE_ONLY
        ])
    );
  }

  private getDefinitions(schema: Schema): Array<string> {
    if (schema.property(ESchemaAttribute.DEFINITIONS)) {
      return this.propertyFormatter.format(this.schemaFormatter, this.attributeFormatter, ESchemaAttribute.DEFINITIONS, schema);
    } else {
      return new Array<string>();
    }
  }

  private getProperties(schema: Schema): Array<string> {
    if (schema.property(ESchemaAttribute.PROPERTIES)) {
      return this.propertyFormatter.format(this.schemaFormatter, this.attributeFormatter, ESchemaAttribute.PROPERTIES, schema);
    } else {
      return new Array<string>();
    }

  }
  //#endregion
}