import { HeaderProperty } from "./header-property";

export class BooleanHeaderProperty extends HeaderProperty<boolean> {

  //#region public abstract methods implementation
  public displayText(value?: boolean): string {
    switch (value) {
      case true: {
        return "Yes";
      }
      case false: {
        return "No";

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