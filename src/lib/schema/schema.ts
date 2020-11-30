import { BaseSchema } from "./base-schema";

export class Schema extends BaseSchema {

  //#region public properties
  public $schema!: string;
  public required!: Array<string>;
  public properties!: Array<BaseSchema>;
  public definitions!: Array<BaseSchema>;
  public slug: string;
  public directory: string;
  //#endregion

  //#region public getters/setters
  public get isAbstract(): boolean {
    return this.properties ? false : true;
  }
  //#endregion

  //#region constructor
  public constructor(directory: string, slug: string) {
    super();
    this.directory = directory;
    this.slug = slug;
  }
  //#endregion
}