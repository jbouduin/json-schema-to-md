import { Schema } from 'src/lib/schema/schema';
import { ESchemaAttribute } from '../schema/schema-attribute.enum';
import { Formatter } from './formatter';

export interface IAttributeFormatter {
  getAttributesAsList(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string>;
  getAttributeValuesAsHorizontalTable(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string>;
  getAttributeValues(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<string, string>;
  getBooleanAttributeText(value?: boolean): string;
  getParentDependentPropertyAttributeValuesAsList(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string>;
  getParentDependentPropertyAttributeValues(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<string, string>;
}

export class AttributeFormatter extends Formatter implements IAttributeFormatter {

  //#region public methods
  public getAttributesAsList(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string> {
    const result = new Array<string>();
    this.getAttributeValues(schema, attributes).forEach((value: string, key: string) => {
      result.push(`- **${key}**: ${value}`)
    });
    return result;
  }

  public getParentDependentPropertyAttributeValuesAsList(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string> {
    const result = new Array<string>();
    this.getParentDependentPropertyAttributeValues(schema, propertyName, attributes).forEach((value: string, key: string) => {
      result.push(`- **${key}**: ${value}`)
    });
    return result;
  }

  public getAttributeValues(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<string, string> {
    const result = new Map<string, string>();

    let toUse: Array<ESchemaAttribute>;
    if (!Array.isArray(attributes)) {
      toUse = [attributes]
    } else {
      toUse = attributes;
    }

    toUse.forEach(prop => {
      let stringValue = '';
      let label = undefined;

      switch (prop) {
        case ESchemaAttribute.ADDITIONAL_ITEMS: {
          label = 'Additional items';
          const value = schema.property(ESchemaAttribute.ADDITIONAL_ITEMS) as boolean;
          stringValue = this.getAllowForbidAttributeText(value);
          break;
        }
        case ESchemaAttribute.ADDITIONAL_PROPERTIES: {
          label = 'Additional properties';
          const value = schema.property(ESchemaAttribute.ADDITIONAL_PROPERTIES) as boolean;
          stringValue = this.getAllowForbidAttributeText(value);
          break;
        }
        case ESchemaAttribute.EXTENSIBLE: {
          label = 'Extensible';
          const value = schema.property(ESchemaAttribute.DEFINITIONS) !== undefined ||
            schema.property(ESchemaAttribute.EXTENSIBLE) as boolean;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        case ESchemaAttribute.PSEUDO_ABSTRACT: {
          label = 'Abstract';
          const value = schema.abstract;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        case ESchemaAttribute.PSEUDO_IS_NULLABLE: {
          label = 'Nullable';
          const value = schema.isNullable;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        case ESchemaAttribute.READ_ONLY: {
          label = 'Read-only';
          const value = schema.property(ESchemaAttribute.READ_ONLY) as boolean;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        case ESchemaAttribute.PSEUDO_STATUS: {
          label = 'Status';
          const value = schema.property(ESchemaAttribute.DEPRECATED) as boolean === true ?
            'deprecated' :
            schema.property(ESchemaAttribute.PSEUDO_STATUS) as string;
          stringValue = this.getStatusAttributeText(value);
          break;
        }
        case ESchemaAttribute.WRITE_ONLY: {
          label = 'Write-only';
          const value = schema.property(ESchemaAttribute.WRITE_ONLY) as boolean;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        default: {
          throw `${prop} not supported`;
        }
      }
      result.set(label, stringValue);
    });
    return result;
  }

  public getAttributeValuesAsHorizontalTable(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string> {
    const values = this.getAttributeValues(schema, attributes);
    return new Array<string>(
      this.buildTableRow([...values.keys()]),
      this.buildTableRow([...values.keys()].map(() => '---')),
      this.buildTableRow([...values.values()])
    );
  }

  public getParentDependentPropertyAttributeValues(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<string, string> {
    const result = new Map<string, string>();

    let toUse: Array<ESchemaAttribute>;
    if (!Array.isArray(attributes)) {
      toUse = [attributes]
    } else {
      toUse = attributes;
    }

    toUse.forEach(prop => {
      let stringValue = '';
      let label = undefined;
      switch (prop) {
        case ESchemaAttribute.PSEUDO_IS_REQUIRED: {
          label = 'Required';
          console.log(schema.property(ESchemaAttribute.REQUIRED), schema.required, schema.isRequired(propertyName));
          stringValue = this.getBooleanAttributeText(schema.isRequired(propertyName));
          break;
        }
        default: {
          throw `${prop} not supported`;
        }
      }
      result.set(label, stringValue);
    });

    return result;
  }
  //#endregion

  //#region private methods
  private getAllowForbidAttributeText(value: boolean): string {
    switch (value) {
      case true: {
        return "Allowed";
      }
      case false: {
        return "Forbidden";
      }
      default: {
        return "Undefined"
      }
    }
  }

  public getBooleanAttributeText(value?: boolean): string {
    switch (value) {
      case true: {
        return "Yes";
      }
      case false: {
        return "No";
      }
      default: {
        return "Undefined"
      }
    }
  }

  private getStatusAttributeText(value?: string): string {
    switch (value) {
      case 'deprecated': {
        return 'Deprecated';
      }
      case 'stable': {
        return 'Stable';

      }
      case 'stabilizing': {
        return 'Stabilizing';

      }
      case 'experimental': {
        return 'Experimental';

      }
      default: {
        return "Unknown"
      }
    }
  }


  //#endregion
}