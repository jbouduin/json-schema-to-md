import { Schema } from "../schema/schema";
import { ESchemaAttribute } from "../schema/schema-attribute.enum";
import { IAttributeFormatter } from "./attribute-formatter";
import { Formatter } from "./formatter";
import { ISchemaFormatter } from "./schema-formatter";


export interface IPropertyFormatter {
  format(
    schemaFormatter: ISchemaFormatter,
    attributeFormatter: IAttributeFormatter,
    schema: Schema): Array<string>;
}

export class PropertyFormatter extends Formatter implements IPropertyFormatter {


  public format(
    schemaFormatter: ISchemaFormatter,
    attributeFormatter: IAttributeFormatter,
    schema: Schema): Array<string> {
    return new Array<string>(
      '## Properties',
      ...this.propertyTable(attributeFormatter, schema),
      ...this.propertyDetails(schemaFormatter, attributeFormatter, schema)
    );
  }

  private propertyTable(attributeFormatter: IAttributeFormatter, schema: Schema): Array<string> {
    const result = new Array<string>();

    result.push(
      this.buildTableRow(['Property', 'Type', 'Required', 'Nullable']),
      this.buildTableRow(['----', '----', '--------', '--------'])
    );

    schema.properties.forEach((propertySchema: Schema, propertyName: string) => {
      const propValues = attributeFormatter.getAttributeValues(schema, [ESchemaAttribute.TYPE, ESchemaAttribute.PSEUDO_IS_NULLABLE]);
      const dependentValues = attributeFormatter.getParentDependentPropertyAttributeValues(propertySchema, propertyName, ESchemaAttribute.PSEUDO_IS_REQUIRED);
      result.push(
        this.buildTableRow([
          propertyName,
          propValues.get(ESchemaAttribute.TYPE),
          dependentValues.get(ESchemaAttribute.PSEUDO_IS_REQUIRED),
          propValues.get(ESchemaAttribute.PSEUDO_IS_NULLABLE)
        ])
      );
    });
    return result;
  }

  private propertyDetails(schemaFormatter: ISchemaFormatter, attributeFormatter: IAttributeFormatter, schema: Schema): Array<string> {
    const result = new Array<string>();
    schema.properties.forEach((propertySchema: Schema, propertyName: string) => {

      result.push(`### ${propertyName}: ${propertySchema.property(ESchemaAttribute.TITLE) as string || 'untitled'}`);
      if (propertySchema.property(ESchemaAttribute.DESCRIPTION)) {
        result.push(propertySchema.property(ESchemaAttribute.DESCRIPTION) as string);
      }
      const propValues = attributeFormatter.getAttributeValues(schema, [ ESchemaAttribute.TYPE, ESchemaAttribute.PSEUDO_IS_NULLABLE]);
      const dependentValues = attributeFormatter.getParentDependentPropertyAttributeValues(propertySchema, propertyName, ESchemaAttribute.PSEUDO_IS_REQUIRED);
      result.push('#### Attributes');
      result.push(`- Type: ${propValues.get(ESchemaAttribute.TYPE) || ''}`)
      result.push(`- Required: ${dependentValues.get(ESchemaAttribute.PSEUDO_IS_REQUIRED) || ''}`);
      result.push(`- Nullable: ${propValues.get(ESchemaAttribute.PSEUDO_IS_NULLABLE) || ''}`);
      if (propertySchema.property(ESchemaAttribute.ID)) {
        result.push(`- $id: ${propertySchema.property(ESchemaAttribute.ID) as string}`);
      }
      // if type object: link...

      result.push('#### Validations');
      // TODO
      result.push(...schemaFormatter.getDefault(propertySchema));
      result.push(...schemaFormatter.getExamples(propertySchema));
    });
    return result;
  }
}