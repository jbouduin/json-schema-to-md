import { HeaderProperty } from "./header-property";

export class StatusHeaderProperty extends HeaderProperty<string> {

  //#region public abstract methods implementation
  public displayText(value?: string): string {
    switch (value) {
      case 'deprecated': {
        return 'Deprecated';
      }
      case 'stable': {
        return 'Stable';

      }
      case 'stabilizing': {
        return 'Stabilizing';

      }
      case 'experimental': {
        return 'Experimental';

      }
      default: {
        return "Unknown"
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