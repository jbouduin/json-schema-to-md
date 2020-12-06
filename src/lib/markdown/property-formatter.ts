import { Schema } from "../schema/schema";
import { ESchemaAttribute } from "../schema/schema-attribute.enum";
import { IAttributeFormatter } from "./attribute-formatter";
import { FormattedAttribute } from "./formatted-attribute";
import { Formatter } from "./formatter";
import { RestrictionFormatter } from "./restriction-formatter";
import { ISchemaFormatter } from "./schema-formatter";


export interface IPropertyFormatter {
  format(
    schemaFormatter: ISchemaFormatter,
    attributeFormatter: IAttributeFormatter,
    schema: Schema): Array<string>;
}

export class PropertyFormatter extends Formatter implements IPropertyFormatter {

  private readonly emptyAttribute: FormattedAttribute;

  public constructor() {
    super();
    this.emptyAttribute = new FormattedAttribute('', '');
  }

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
      const propValues = attributeFormatter.getAttributeValues(propertySchema, [ESchemaAttribute.TYPE, ESchemaAttribute.PSEUDO_IS_NULLABLE]);
      const dependentValues = attributeFormatter.getParentDependentPropertyAttributeValues(schema, propertyName, ESchemaAttribute.PSEUDO_IS_REQUIRED);

      result.push(
        this.buildTableRow([
          propertyName,
          (propValues.get(ESchemaAttribute.TYPE) || this.emptyAttribute).value,
          (dependentValues.get(ESchemaAttribute.PSEUDO_IS_REQUIRED) || this.emptyAttribute).value,
          (propValues.get(ESchemaAttribute.PSEUDO_IS_NULLABLE) || this.emptyAttribute).value
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
      const propValues = new Array<FormattedAttribute>(
        ...attributeFormatter.getAttributeValues(propertySchema, [ ESchemaAttribute.TYPE, ESchemaAttribute.PSEUDO_IS_NULLABLE]).values(),
        ...attributeFormatter.getParentDependentPropertyAttributeValues(schema, propertyName, ESchemaAttribute.PSEUDO_IS_REQUIRED).values());

      result.push('#### Attributes');
      if (propertySchema.property(ESchemaAttribute.ID)) {
        result.push(`- $id: ${propertySchema.property(ESchemaAttribute.ID) as string}`);
      }
      propValues.forEach(prop => result.push(this.buildListItem(prop)));


      // TODO inject
      result.push(...(new RestrictionFormatter().getRestrictionsAsList(propertySchema)));

      result.push(...schemaFormatter.getDefault(propertySchema));
      result.push(...schemaFormatter.getExamples(propertySchema));
    });
    return result;
  }
}