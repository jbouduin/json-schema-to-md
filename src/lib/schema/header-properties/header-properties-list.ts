import { Schema } from 'src/lib/schema/schema';
import { AllowableHeaderProperty } from './allowable-header-property';
import { BooleanHeaderProperty } from './boolean-header-property';
import { HeaderProperty } from "./header-property";
import { EHeaderProperty } from './header-property.enum';
import { StatusHeaderProperty } from './status-header-property';

export class HeaderPropertiesList {

  //#region private properties
  private schema: Schema;
  //#endregion

  //#region public getters
  public get abstract(): BooleanHeaderProperty {
    return this.properties.find(prop => prop.name === EHeaderProperty.ABSTRACT) as BooleanHeaderProperty;
  }

  public get extensible(): BooleanHeaderProperty {
    return this.properties.find(prop => prop.name === EHeaderProperty.EXTENSIBLE) as BooleanHeaderProperty;
  }

  public get identifiable(): BooleanHeaderProperty {
    return this.properties.find(prop => prop.name === EHeaderProperty.IDENTIFIABLE) as BooleanHeaderProperty;
  }

  public get custom(): AllowableHeaderProperty {
    return this.properties.find(prop => prop.name === EHeaderProperty.CUSTOM) as AllowableHeaderProperty;
  }

  public get additional(): AllowableHeaderProperty {
    return this.properties.find(prop => prop.name === EHeaderProperty.ADDITIONAL) as AllowableHeaderProperty;
  }

  public get status(): StatusHeaderProperty {
    return this.properties.find(prop => prop.name === EHeaderProperty.STATUS) as StatusHeaderProperty;
  }
  //#endregion

  //#region private properties
  private properties!: Array<HeaderProperty<boolean | string>>;
  //#endregion

  //#region constructor
  public constructor(schema: Schema) {
    this.schema = schema;
    this.initializeList();
  }
  //#endregion

  //#region private helper methods
  private initializeList(): void {
    this.properties = new Array<HeaderProperty<boolean | string>>();

    this.properties.push(new StatusHeaderProperty(EHeaderProperty.STATUS, 'Status'));
    this.properties.push(new BooleanHeaderProperty(EHeaderProperty.ABSTRACT, 'Abstract'));
    this.properties.push(new BooleanHeaderProperty(EHeaderProperty.EXTENSIBLE, 'Extensible'));
    this.properties.push(new BooleanHeaderProperty(EHeaderProperty.IDENTIFIABLE, 'Identifiable'));
    this.properties.push(new AllowableHeaderProperty(EHeaderProperty.CUSTOM, 'Custom Properties'));
    this.properties.push(new AllowableHeaderProperty(EHeaderProperty.ADDITIONAL, 'Additional Properties'));

    // {
    //   name: 'restrictions',
    //     title: i18n`Access Restrictions`,
    //       readOnlylabel: i18n`Read only`,
    //         writeOnlylabel: i18n`Write only`,
    //           secretlabel: i18n`cannot be read or written`,
    //             undefinedlabel: i18n`none`,
    // },
    // {
    //   name: 'definedin',
    //     title: i18n`Defined In`,
    //       undefinedlabel: i18n`Unknown definition`,
    // }
    // ]
  }
  //#endregion
}