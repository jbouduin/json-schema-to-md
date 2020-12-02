import { Schema } from 'src/lib/schema/schema';
import { EHeaderAttribute } from '../schema/header-attribute.enum';
import { ESchemaAttribute } from '../schema/schema-attribute.enum';

export interface IHeaderAttributeFormatter {
  getAttributeList(schema: Schema, attributes?: EHeaderAttribute | Array<EHeaderAttribute>): Array<string>;
  getHorizontalAttributeTable(schema: Schema, attributes?: EHeaderAttribute | Array<EHeaderAttribute>): Array<string>;
}

export class HeaderAttributeFormatter implements IHeaderAttributeFormatter {

  //#region public methods
  public getAttributeList(schema: Schema, attributes?: EHeaderAttribute | Array<EHeaderAttribute>): Array<string> {
    const result = new Array<string>();
    this.getAttributeValues(schema, attributes).forEach((value: string, key: string) => {
      result.push(`- **${key}**: ${value}`)
    });
    return result;
  }

  public getHorizontalAttributeTable(schema: Schema, attributes?: EHeaderAttribute | Array<EHeaderAttribute>): Array<string> {
    const result = new Array<string>();
    const values = this.getAttributeValues(schema, attributes);
    result.push(`| ${[...values.keys()].join(' | ')} |`);
    result.push(`| ${[...values.keys()].map(_key => '---').join(' | ')} |`);
    result.push(`| ${[...values.values()].join(' | ')} |`);
    return result;
  }
  //#endregion

  //   // {
  //   //   name: 'restrictions',
  //   //     title: i18n`Access Restrictions`,
  //   //       readOnlylabel: i18n`Read only`,
  //   //         writeOnlylabel: i18n`Write only`,
  //   //           secretlabel: i18n`cannot be read or written`,
  //   //             undefinedlabel: i18n`none`,
  //   // },
  //   // {
  //   //   name: 'definedin',
  //   //     title: i18n`Defined In`,
  //   //       undefinedlabel: i18n`Unknown definition`,
  //   // }
  //   // ]
  // }

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

  private getBooleanAttributeText(value?: boolean): string {
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

  private getAttributeValues(schema: Schema, attributes?: EHeaderAttribute | Array<EHeaderAttribute>): Map<string, string> {
    const result = new Map<string, string>();

    let toUse: Array<EHeaderAttribute>;
    if (!attributes) {
      toUse = Object.values(EHeaderAttribute);
    }
    else if (!Array.isArray(attributes)) {
      toUse = [attributes]
    } else {
      toUse = attributes;
    }

    toUse.forEach(prop => {
      let stringValue = '';
      let label = undefined;

      switch (prop) {
        case EHeaderAttribute.ABSTRACT: {
          label = 'Abstract';
          const value = schema.abstract;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        case EHeaderAttribute.ADDITIONAL_ITEMS: {
          label = 'Additional items';
          const value = schema.property(ESchemaAttribute.ADDITIONAL_ITEMS) as boolean;
          stringValue = this.getAllowForbidAttributeText(value);
          break;
        }
        case EHeaderAttribute.ADDITIONAL_PROPERTIES: {
          label = 'Additional properties';
          const value = schema.property(ESchemaAttribute.ADDITIONAL_PROPERTIES) as boolean;
          stringValue = this.getAllowForbidAttributeText(value);
          break;
        }
        case EHeaderAttribute.CUSTOM: {
          break;
        }
        case EHeaderAttribute.EXTENSIBLE: {
          label = 'Extensible';
          const value = schema.property(ESchemaAttribute.DEFINITIONS) !== undefined ||
            schema.property(ESchemaAttribute.EXTENSIBLE) as boolean;
          stringValue = this.getBooleanAttributeText(value);
          break;
        }
        case EHeaderAttribute.IDENTIFIABLE: {
          // TODO this can only be implemented after traversing the schema
          break;
        }
        case EHeaderAttribute.STATUS: {
          label = 'Status';
          const value = schema.property(ESchemaAttribute.DEPRECATED) as boolean === true ?
            'deprecated' :
            schema.property(ESchemaAttribute.STATUS) as string;
          stringValue = this.getStatusAttributeText(value);
          break;
        }
      }
      if (label) {
        result.set(label, stringValue);
      }
    });
    return result;
  }
  //#endregion
}