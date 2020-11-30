import * as Collections from 'typescript-collections';
import { Format } from './format';

export class FormatsList {

  //#region static formats
  private static readonly RESTRICTION_FORMAT_DATE_TIME =  'date-time';
  public static get dateTime(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_DATE_TIME) as Format; }

  private static readonly RESTRICTION_FORMAT_DATE = 'date';
  public static get date(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_DATE) as Format; }

  private static readonly RESTRICTION_FORMAT_TIME = 'time';
  public static get time(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_TIME) as Format; }

  private static readonly RESTRICTION_FORMAT_DURATION = 'duration';
  public static get duration(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_DURATION) as Format; }

  private static readonly RESTRICTION_FORMAT_EMAIL = 'email';
  public static get email(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_EMAIL) as Format; }

  private static readonly RESTRICTION_FORMAT_IDN_EMAIL = 'idn-email';
  public static get idnEmail(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_IDN_EMAIL) as Format; }

  private static readonly RESTRICTION_FORMAT_HOSTNAME = 'hostname';
  public static get hostname(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_HOSTNAME) as Format; }

  private static readonly RESTRICTION_FORMAT_IDN_HOSTNAME = 'idn-hostname';
  public static get idnHostname(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_IDN_HOSTNAME) as Format; }

  private static readonly RESTRICTION_FORMAT_IPV4 = 'ipv4';
  public static get ipv4(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_IPV4) as Format; }

  private static readonly RESTRICTION_FORMAT_IPV6 = 'ipv6';
  public static get ipv6(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_IPV6) as Format; }

  private static readonly RESTRICTION_FORMAT_URI = 'uri';
  public static get uri(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_URI) as Format; }

  private static readonly RESTRICTION_FORMAT_IRI = 'iri';
  public static get iri(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_IRI) as Format; }

  private static readonly RESTRICTION_FORMAT_URI_REFERENCE = 'uri-reference';
  public static get uriReference(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_URI_REFERENCE) as Format; }

  private static readonly RESTRICTION_FORMAT_IRI_REFERENCE = 'iri-reference';
  public static get iriReference(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_IRI_REFERENCE) as Format; }

  private static readonly RESTRICTION_FORMAT_UUID = 'uuid';
  public static get uuid(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_UUID) as Format; }

  private static readonly RESTRICTION_FORMAT_JSON_POINTER = 'json-pointer';
  public static get jsonPointer(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_JSON_POINTER) as Format; }

  private static readonly RESTRICTION_FORMAT_RELATIVE_JSON_POINTER = 'relative-json-pointer';
  public static get relativeJsonPointer(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_RELATIVE_JSON_POINTER) as Format; }

  private static readonly RESTRICTION_FORMAT_REGEX = 'regex';
  public static get regex(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_REGEX) as Format; }

  private static readonly RESTRICTION_FORMAT_URI_TEMPLATE = 'uri-template';
  public static get uriTemplate(): Format { return this.list.formats.getValue(this.RESTRICTION_FORMAT_URI_TEMPLATE) as Format; }
  //#endregion

  //#region singleton implementation
  private static _instance?: FormatsList;

  private static get list(): FormatsList {
    if (!this._instance) {
      this._instance = new FormatsList()
    }
    return this._instance;
  }
  //#endregion

  //#region private properties
  private formats!: Collections.Dictionary<string, Format>;
  //#endregion

  //#region constructor
  private constructor() {
    this.initializeList();
  }
  //#endregion

  //#region private helper methods
  private initializeList(): void {
    this.formats = new Collections.Dictionary<string, Format>();
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_DATE_TIME, new Format(
      'date time',
      'the string must be a date time string, according to ',
      'RFC 3339, section 5.6',
      'https://tools.ietf.org/html/rfc3339')
    );
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_DATE, new Format(
      'date',
      'the string must be a date string, according to ',
      'RFC 3339, section 5.6',
      'https://tools.ietf.org/html/rfc3339'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_TIME, new Format(
      'time',
      'the string must be a time string, according to ',
      'RFC 3339, section 5.6',
      'https://tools.ietf.org/html/rfc3339'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_DURATION, new Format(
      'duration',
      'the string must be a duration string, according to ',
      'RFC 3339, section 5.6',
      'https://tools.ietf.org/html/rfc3339'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_EMAIL, new Format(
      'email',
      'the string must be an email address, according to ',
      'RFC 5322, section 3.4.1',
      'https://tools.ietf.org/html/rfc5322'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_IDN_EMAIL, new Format(
      '(international) email',
      'the string must be an (international) email address, according to ',
      'RFC 6531',
      'https://tools.ietf.org/html/rfc6531'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_HOSTNAME, new Format(
      'hostname',
      'the string must be a hostname, according to ',
      'RFC 1123, section 2.1',
      'https://tools.ietf.org/html/rfc1123'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_IDN_HOSTNAME, new Format(
      '(international) hostname',
      'the string must be an (IDN) hostname, according to ',
      'RFC 5890, section 2.3.2.3',
      'https://tools.ietf.org/html/rfc5890'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_IPV4, new Format(
      'IPv4',
      'the string must be an IPv4 address (dotted quad), according to ',
      'RFC 2673, section 3.2',
      'https://tools.ietf.org/html/rfc2673'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_IPV6, new Format(
      'IPv6',
      'the string must be an IPv6 address, according to ',
      'RFC 4291, section 2.2',
      'https://tools.ietf.org/html/rfc4291'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_URI, new Format(
      'URI',
      'the string must be a URI, according to ',
      'RFC 3986',
      'https://tools.ietf.org/html/rfc3986'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_IRI, new Format(
      'IRI',
      'the string must be a IRI, according to ',
      'RFC 3987',
      'https://tools.ietf.org/html/rfc3987'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_URI_REFERENCE, new Format(
      'URI reference',
      'the string must be a URI reference, according to ',
      'RFC 3986',
      'https://tools.ietf.org/html/rfc3986'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_IRI_REFERENCE, new Format(
      'IRI reference',
      'the string must be a IRI reference, according to ',
      'RFC 3987',
      'https://tools.ietf.org/html/rfc3987'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_UUID, new Format(
      'UUID',
      'the string must be a UUID, according to ',
      'RFC 4122',
      'https://tools.ietf.org/html/rfc4122'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_JSON_POINTER, new Format(
      'JSON Pointer',
      'the string must be a JSON Pointer, according to ',
      'RFC 6901, section 5',
      'https://tools.ietf.org/html/rfc6901'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_RELATIVE_JSON_POINTER, new Format(
      'Relative JSON Pointer',
      'the string must be a relative JSON Pointer, according to ',
      'draft-handrews-relative-json-pointer-01',
      'https://tools.ietf.org/html/draft-handrews-relative-json-pointer-01'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_REGEX, new Format(
      'RegEx',
      'the string must be a regular expression, according to ',
      'ECMA-262',
      'http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf'));
    this.formats.setValue(FormatsList.RESTRICTION_FORMAT_URI_TEMPLATE, new Format(
      'URI Template',
      'the string must be a URI template, according to ',
      'RFC 6570',
      'https://tools.ietf.org/html/rfc6570'));
  }
}