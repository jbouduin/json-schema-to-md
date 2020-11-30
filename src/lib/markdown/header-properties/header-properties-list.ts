import * as Collections from 'typescript-collections';
import { AllowableHeaderProperty } from './allowable-header-property';
import { BooleanHeaderProperty } from './boolean-header-property';
import { HeaderProperty } from "./header-property";
import { StatusHeaderProperty } from './status-header-property';

export class HeaderPropertiesList {

  //#region static header properties
  private static readonly HEADER_PROPERTY_ABSTRACT = 'abstract';
  public static get abstract(): BooleanHeaderProperty {
    return this.list.properties.getValue(this.HEADER_PROPERTY_ABSTRACT) as BooleanHeaderProperty;
  }

  private static readonly HEADER_PROPERTY_EXTENSIBLE = 'extensible';
  public static get extensible(): BooleanHeaderProperty {
    return this.list.properties.getValue(this.HEADER_PROPERTY_EXTENSIBLE) as BooleanHeaderProperty;
  }

  private static readonly HEADER_PROPERTY_IDENTIFIABLE = 'identifiable';
  public static get identifiable(): BooleanHeaderProperty {
    return this.list.properties.getValue(this.HEADER_PROPERTY_IDENTIFIABLE) as BooleanHeaderProperty;
  }

  private static readonly HEADER_PROPERTY_CUSTOM = 'custom';
  public static get custom(): AllowableHeaderProperty {
    return this.list.properties.getValue(this.HEADER_PROPERTY_CUSTOM) as AllowableHeaderProperty;
  }

  private static readonly HEADER_PROPERTY_ADDITIONAL = 'additional';
  public static get additional(): AllowableHeaderProperty {
    return this.list.properties.getValue(this.HEADER_PROPERTY_ADDITIONAL) as AllowableHeaderProperty;
  }

  private static readonly HEADER_PROPERTY_STATUS = 'status';
  public static get status(): StatusHeaderProperty {
    return this.list.properties.getValue(this.HEADER_PROPERTY_STATUS) as StatusHeaderProperty;
  }
  //#endregion

  //#region singleton implementation
  private static _instance?: HeaderPropertiesList;

  private static get list(): HeaderPropertiesList {
    if (!this._instance) {
      this._instance = new HeaderPropertiesList()
    }
    return this._instance;
  }
  //#endregion

  //#region private properties
  private properties!: Collections.Dictionary<string, HeaderProperty<boolean | string>>;
  //#endregion

  //#region constructor
  private constructor() {
    this.initializeList();
  }
  //#endregion

  //#region private helper methods
  private initializeList(): void {
    this.properties = new Collections.Dictionary<string, HeaderProperty<boolean | string>>();

    this.properties.setValue(
      HeaderPropertiesList.HEADER_PROPERTY_ABSTRACT,
      new BooleanHeaderProperty(HeaderPropertiesList.HEADER_PROPERTY_ABSTRACT, 'Abstract')
    );

    this.properties.setValue(
      HeaderPropertiesList.HEADER_PROPERTY_EXTENSIBLE,
      new BooleanHeaderProperty(HeaderPropertiesList.HEADER_PROPERTY_EXTENSIBLE, 'Extensible')
    );

    this.properties.setValue(
      HeaderPropertiesList.HEADER_PROPERTY_IDENTIFIABLE,
      new BooleanHeaderProperty(HeaderPropertiesList.HEADER_PROPERTY_IDENTIFIABLE, 'Identifiable')
    );

    this.properties.setValue(
      HeaderPropertiesList.HEADER_PROPERTY_CUSTOM,
      new AllowableHeaderProperty(HeaderPropertiesList.HEADER_PROPERTY_CUSTOM, 'Custom Properties')
    );

    this.properties.setValue(
      HeaderPropertiesList.HEADER_PROPERTY_ADDITIONAL,
      new AllowableHeaderProperty(HeaderPropertiesList.HEADER_PROPERTY_ADDITIONAL, 'Additional Properties')
    );

    this.properties.setValue(
      HeaderPropertiesList.HEADER_PROPERTY_STATUS,
      new StatusHeaderProperty(HeaderPropertiesList.HEADER_PROPERTY_STATUS, 'Status')
    );

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