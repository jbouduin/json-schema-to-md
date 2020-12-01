export type schemaType = 'object' | 'string' | 'number' | 'integer' | 'array' | 'boolean' | 'null';

export abstract class XBaseSchema {
  //#region public properties
  public $id!: string;
  public type!: schemaType | Array<schemaType>;
  public title!: string;
  public description!: string;
  //#endregion

}