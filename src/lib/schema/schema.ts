import { ESchemaAttribute } from "./schema-attribute.enum";

export class Schema {

  //#region public properties
  public slug: string;
  public directory: string;
  //#endregion

  //#region private properties
  private schemaProperties: Array<[string, unknown]>;
  //#endregion

  //#region public getters/setters
  public get abstract(): boolean {
    return this.property(ESchemaAttribute.PROPERTIES) ? false : true;
  }

  public property(name: ESchemaAttribute): unknown {
    return this.schemaProperties.find(prop => prop[0] === name)?.[1];
  }
  //#endregion

  //#region constructor
  public constructor(directory: string, slug: string, schemaString: string) {
    this.directory = directory;
    this.slug = slug;
    this.schemaProperties = Object.entries(JSON.parse(schemaString));
  }
  //#endregion
}