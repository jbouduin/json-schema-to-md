import { EFormat } from '../schema/format-enum';
import { ERestriction } from '../schema/restriction-enum';
import { Schema } from '../schema/schema';
import { FormattedAttribute } from './formatted-attribute';
import { Formatter } from './formatter';

export interface IRestrictionFormatter {
  getRestrictionsAsList(schema: Schema): Array<string>;
}

export class RestrictionFormatter extends Formatter implements IRestrictionFormatter {

  //#region private properties

  //#endregion

  //#region constructor

  //#endregion

  //#region public methods
  public getRestrictionsAsList(schema: Schema): Array<string> {
    const toUse = Object.values(ERestriction)
      .filter(restriction => schema.property(restriction) !== undefined);
    if (toUse.length > 0) {
      return new Array<string>(
        '#### Restrictions',
        ...toUse.map(restriction => this.buildListItem(this.formatSingleRestriction(schema, restriction)))
      );
    } else {
      return new Array<string>();
    }

  }
  //#endregion

  //#region private helper methods
  private formatSingleRestriction(schema: Schema, restriction: ERestriction): FormattedAttribute {

    switch (restriction) {
      case ERestriction.CONST: {
        return new FormattedAttribute(
          'Constant',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.ENUM: {
        return new FormattedAttribute(
          'Enumeration',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.EXCLUSIVE_MAXIMUM: {
        return new FormattedAttribute(
          'Maximum value (exclusive)',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.EXCLUSIVE_MINIMUM: {
        return new FormattedAttribute(
          'Minimum value (exclusive)',
          `${schema.property(restriction) as string}`)
      }
      case ERestriction.FORMAT: {
        return new FormattedAttribute(
          'Format',
          this.formatFormat(schema.property(restriction) as string));
      }
      case ERestriction.MAX_ITEMS: {
        return new FormattedAttribute(
          'Maximum number of items',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.MAX_LENGTH: {
        return new FormattedAttribute('Maximum length',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.MAXIMUM: {
        return new FormattedAttribute(
          'Maximum value',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.MIN_ITEMS: {
        return new FormattedAttribute(
          'Minimum number of items',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.MIN_LENGTH: {
        return new FormattedAttribute(
          'Minimum length',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.MINIMUM: {
        return new FormattedAttribute(
          'Minimum value',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.MULTIPLE_OF: {
        return new FormattedAttribute(
          'multiple of',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.PATTERN: {
        return new FormattedAttribute(
          'Pattern',
          `${schema.property(restriction) as string}`);
      }
      case ERestriction.UNIQUE_ITEMS: {
        return new FormattedAttribute(
          'Unique items',
          `${schema.property(restriction) as string}`);
      }
    }
  }

  private formatFormat(format: string): string {
    switch (format) {
      case (EFormat.DATE_TIME): {
        return this.formatWithRfc('date-time', 'RFC 3339, section 5.6', 'https://tools.ietf.org/html/rfc3339');
      }
      case (EFormat.DATE): {
        return this.formatWithRfc('date', 'RFC 3339, section 5.6', 'https://tools.ietf.org/html/rfc3339');
      }
      case (EFormat.TIME): {
        return this.formatWithRfc('time', 'RFC 3339, section 5.6', 'https://tools.ietf.org/html/rfc3339');
      }
      case (EFormat.DURATION): {
        return this.formatWithRfc('duration', 'RFC 3339, section 5.6', 'https://tools.ietf.org/html/rfc3339');
      }
      case (EFormat.EMAIL): {
        return this.formatWithRfc('email', 'RFC 5322, section 3.4.1', 'https://tools.ietf.org/html/rfc5322');
      }
      case (EFormat.IDN_EMAIL): {
        return this.formatWithRfc('(international) email', 'RFC 6531', 'https://tools.ietf.org/html/rfc6531');
      }
      case (EFormat.HOSTNAME): {
        return this.formatWithRfc('hostname', 'RFC 1123, section 2.1', 'https://tools.ietf.org/html/rfc1123');
      } case (EFormat.IDN_HOSTNAME): {
        return this.formatWithRfc('(international) hostname', 'RFC 5890, section 2.3.2.3', 'https://tools.ietf.org/html/rfc5890');
      }
      case (EFormat.IPV4): {
        return this.formatWithRfc('IPv4', 'RFC 2673, section 3.2', 'https://tools.ietf.org/html/rfc2673');
      }
      case (EFormat.IPV6): {
        return this.formatWithRfc('IPv6', 'RFC 4291, section 2.2', 'https://tools.ietf.org/html/rfc4291');
      }
      case (EFormat.URI): {
        return this.formatWithRfc('URI', 'RFC 3986', 'https://tools.ietf.org/html/rfc3986');
      }
      case (EFormat.IRI): {
        return this.formatWithRfc('IRI', 'RFC 3987', 'https://tools.ietf.org/html/rfc3987');
      }
      case (EFormat.URI_REFERENCE): {
        return this.formatWithRfc('URI reference', 'RFC 3986', 'https://tools.ietf.org/html/rfc3986');
      }
      case (EFormat.IRI_REFERENCE): {
        return this.formatWithRfc('IRI reference', 'RFC 3987', 'https://tools.ietf.org/html/rfc3987');
      }
      case (EFormat.UUID): {
        return this.formatWithRfc('UUID', 'RFC 4122', 'https://tools.ietf.org/html/rfc4122');
      }
      case (EFormat.JSON_POINTER): {
        return this.formatWithRfc('JSON Pointer', 'RFC 6901, section 5', 'https://tools.ietf.org/html/rfc6901');
      }
      case (EFormat.RELATIVE_JSON_POINTER): {
        return this.formatWithRfc('Relative JSON Pointer', 'draft-handrews-relative-json-pointer-01', 'https://tools.ietf.org/html/draft-handrews-relative-json-pointer-01');
      }
      case (EFormat.REGEX): {
        return this.formatWithRfc('RegEx', 'ECMA-262', 'http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf');
      }
      case (EFormat.URI_TEMPLATE): {
        return this.formatWithRfc('URI Template', 'RFC 6570', 'https://tools.ietf.org/html/rfc6570');
      }
      default: {
        return '';
      }
    }
  }

  private formatWithRfc(name: string, linkText: string, linkUrl: string): string {
    return `${name}, as defined by [${linkText}](${linkUrl})`;
  }
}