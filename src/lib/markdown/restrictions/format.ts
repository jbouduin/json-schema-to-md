export class Format {
  //#region public readonly properties
  public readonly label: string;
  public readonly specName: string;
  public readonly specLink: string;
  public readonly text: string;
  //#endregion

  //#region constructor
  public constructor(label: string, text: string, specName: string, specLink: string) {
    this.label = label;
    this.specName = specName;
    this.specLink = specLink;
    this.text = text;
  }
  //#endregion
}