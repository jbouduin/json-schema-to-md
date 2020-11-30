export type SchemaType = 'object' | 'string' | 'number' | 'integer' | 'array' | 'boolean' | 'null';

export abstract class BaseSchema {
  //#region public properties
  public $id!: string;
  public type!: SchemaType | Array<SchemaType>;
  public title!: string;
  public description!: string;
  //#endregion

}