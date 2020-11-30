import { HeaderProperty } from "./header-property";

export class AllowableHeaderProperty extends HeaderProperty<boolean> {

  //#region public abstract methods implementation
  public displayText(value?: boolean): string {
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
  //#endregion

  //#region constructor
  public constructor(name: string, title: string) {
    super(name, title);
  }
  //#endregion
}