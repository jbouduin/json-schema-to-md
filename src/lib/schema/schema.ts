// import { BaseSchema } from "./base-schema";
import { HeaderPropertiesList } from "./header-properties/header-properties-list";
import { ESchemaAttribute } from "./schema-attribute-enum";

export class Schema {
// extends BaseSchema {

  //#region public properties
  public slug: string;
  public directory: string;
  //#endregion

  //#region private properties
  private schemaProperties: Array<[string, unknown]>;
  private _headerPropertiesList: HeaderPropertiesList;
  //#endregion

  //#region public getters/setters
  public get headerPropertiesList(): HeaderPropertiesList {
    return this._headerPropertiesList;
  }

  public get abstract(): boolean {
    return this.property(ESchemaAttribute.PROPERTIES) ? false : true;
  }

  public property(name: ESchemaAttribute): unknown {
    return this.schemaProperties.find(prop => prop[0] === name)?.[1];
  }
  //#endregion

  //#region constructor
  public constructor(directory: string, slug: string, schemaString: string) {
    // super();
    this.directory = directory;
    this.slug = slug;
    this.schemaProperties = Object.entries(JSON.parse(schemaString));
    this._headerPropertiesList = new HeaderPropertiesList(this);
  }
  //#endregion
}