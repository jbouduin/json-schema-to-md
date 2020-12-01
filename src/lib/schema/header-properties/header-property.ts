
export abstract class HeaderProperty<T> {

  //#region public readonly properties
  public readonly name: string;
  public readonly title: string;
  //#endregion

  //#region public abstract methods
  public abstract displayText(value?: T): string;
  //#endregion

  //#region constructor
  public constructor(name: string, title: string) {
    this.name = name;
    this.title = title;
  }
  //#endregion
}