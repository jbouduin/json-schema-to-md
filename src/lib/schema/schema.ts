import { ESchemaAttribute } from "./schema-attribute.enum";
import { ESchemaType } from "./schema-type.enum";

export class Schema {

  //#region public properties
  public slug: string;
  public directory: string;
  //#endregion

  //#region private properties
  private schemaProperties: Array<[string, unknown]>;
  private processedProperties: Map<string, Schema>;
  private processedDefinitions: Map<string, Schema>;
  //#endregion

  //#region public getters/setters
  public get abstract(): boolean {
    return this.property(ESchemaAttribute.PROPERTIES) ? false : true;
  }

  public get definitions(): Map<string, Schema> {
    return this.processedDefinitions;
  }

  public get isNullable(): boolean {
    return this.type.includes(ESchemaType.NULL);
  }

  public get properties(): Map<string, Schema> {
    return this.processedProperties;
  }

  public get required(): Array<string> {
    const parsed = this.property(ESchemaAttribute.REQUIRED);
    if (Array.isArray(parsed)) {
      return parsed as Array<string>;
    } else {
      return new Array<string>();
    }
  }

  public get type(): Array<string> {
    const parsed = this.property(ESchemaAttribute.TYPE);

    if (Array.isArray(parsed)) {
      return (parsed as Array<string>).map( tp => this.validateType(tp));
    } else if (typeof parsed === 'string') {
      return parsed.length > 0 ? [this.validateType(parsed)] : ['Undefined'];
    } else if (parsed) {
      return new Array<string>('Invalid value');
    } else {
      return new Array<string>('Undefined');
    }
  }
  //#endregion

  //#region constructor
  public constructor(directory: string, slug: string, schemaString: string) {
    this.directory = directory;
    this.slug = slug;
    this.processedDefinitions = new Map<string, Schema>();
    this.processedProperties = new Map<string, Schema>();
    this.schemaProperties = Object.entries(JSON.parse(schemaString));

  }
  //#endregion

  //#region public methods
  public isRequired(propertyName: string): boolean {
    return this.required.includes(propertyName);
  }

  public property(name: ESchemaAttribute): unknown {
    return this.schemaProperties.find(prop => prop[0] === name)?.[1];
  }
  //#endregion

  //#region private methods
  private validateType(tp: string): string {
    return Object.values(ESchemaType).includes(tp as ESchemaType) ? tp : 'Invalid value';
  }
  //#endregion
}