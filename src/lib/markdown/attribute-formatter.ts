import { Schema } from 'src/lib/schema/schema';
import { ESchemaAttribute } from '../schema/schema-attribute.enum';
import { ESchemaType } from '../schema/schema-type.enum';
import { FormattedAttribute } from './formatted-attribute';
import { Formatter } from './formatter';

export interface IAttributeFormatter {
  getAttributesAsList(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string>;
  getAttributeValuesAsHorizontalTable(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string>;
  getAttributeValues(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<ESchemaAttribute, FormattedAttribute>;
  getBooleanAttributeText(value?: boolean): string;
  getParentDependentPropertyAttributeValuesAsList(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string>;
  getParentDependentPropertyAttributeValues(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<ESchemaAttribute, FormattedAttribute>;
}

export class AttributeFormatter extends Formatter implements IAttributeFormatter {

  //#region public methods
  public getAttributesAsList(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string> {
    const result = new Array<string>();
    this.getAttributeValues(schema, attributes)
      .forEach((value: FormattedAttribute) => result.push(this.buildListItem(value)));
    return result;
  }

  public getParentDependentPropertyAttributeValuesAsList(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string> {
    const result = new Array<string>();
    this.getParentDependentPropertyAttributeValues(schema, propertyName, attributes)
      .forEach((value: FormattedAttribute) => result.push(this.buildListItem(value)));
    return result;
  }

  public getAttributeValues(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<ESchemaAttribute, FormattedAttribute> {
    const result = new Map<ESchemaAttribute, FormattedAttribute>();

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
        case ESchemaAttribute.TYPE: {
          label = 'Type';
          stringValue = schema.type.filter(tp => tp != ESchemaType.NULL).map(tp => `\`${tp}\``).join(' ');
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
      result.set(prop, new FormattedAttribute(label, stringValue));
    });
    return result;
  }

  public getAttributeValuesAsHorizontalTable(schema: Schema, attributes: ESchemaAttribute | Array<ESchemaAttribute>): Array<string> {
    const values = new Array<FormattedAttribute>(...this.getAttributeValues(schema, attributes).values());
    return new Array<string>(
      this.buildTableRow(values.map((value: FormattedAttribute) => value.label)),
      this.buildTableRow(values.map(() => '---')),
      this.buildTableRow(values.map((value: FormattedAttribute) => value.value))
    );
  }

  public getParentDependentPropertyAttributeValues(
    schema: Schema,
    propertyName: string,
    attributes: ESchemaAttribute | Array<ESchemaAttribute>): Map<ESchemaAttribute, FormattedAttribute> {
    const result = new Map<ESchemaAttribute, FormattedAttribute>();

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
          stringValue = this.getBooleanAttributeText(schema.isRequired(propertyName));
          break;
        }
        default: {
          throw `${prop} not supported`;
        }
      }
      result.set(prop, new FormattedAttribute(label, stringValue));
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