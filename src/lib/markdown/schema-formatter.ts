import { Schema } from "../schema/schema";
import { ESchemaAttribute } from "../schema/schema-attribute.enum";

export interface ISchemaFormatter {
  getDefault(schema: Schema): Array<string>;
  getExamples(schema: Schema): Array<string>;
}

export class SchemaFormatter implements ISchemaFormatter {

  public getDefault(schema: Schema): Array<string> {

    if (schema.property(ESchemaAttribute.DEFAULT) || typeof schema.property(ESchemaAttribute.DEFAULT) === 'string') {
      return new Array<string>(
        '## Default',
        '```json',
        JSON.stringify(schema.property(ESchemaAttribute.DEFAULT), undefined, 2),
        '```',
      );
    } else {
      return new Array<string>();
    }
  }

  public getExamples(schema: Schema): Array<string> {
    if (schema.property(ESchemaAttribute.EXAMPLES)) {
      const raw = schema.property(ESchemaAttribute.EXAMPLES) as Array<unknown>;
      if (raw.length > 0) {
        const processed = (schema.property(ESchemaAttribute.EXAMPLES) as Array<unknown>)
          .map(example => [
            '```json',
            JSON.stringify(example, undefined, 2),
            '```'
          ]);
        return new Array<string>(
          '## Examples',
          ...(new Array<string>().concat(...processed))
        );
      } else {
        return new Array<string>();
      }
    } else {
      return new Array<string>();
    }
  }
}