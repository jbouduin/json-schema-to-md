

export class FormattedAttribute {

  //#region private properties
  private _label: string;
  private _value: string;
  //#endregion

  //#region public getters
  public get label(): string {
    return this._label;
  }

  public get value(): string {
    return this._value;
  }
  //#endregion

  //#region constructor
  public constructor(label: string, value: string) {
    this._label = label;
    this._value = value;
  }
  //#endregion
}