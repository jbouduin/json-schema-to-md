import { EHeaderAttribute } from '../schema/header-attribute.enum';
import { Schema } from '../schema/schema';
import { HeaderAttributeFormatter } from './header-attribute-formatter';

//#region general tests
describe('general tests', () => {
  test('all header props', () => {
    const schema = new Schema('dir', 'slug', '{}');
    const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, undefined);
    expect(headerAttributes.length).toEqual(5);
  });
  test('not supported yet: \'Custom\'', () => {
    const schema = new Schema('dir', 'slug', '{}');
    const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.CUSTOM);
    expect(headerAttributes.length).toEqual(0);
  });
  test('not supported yet: \'Identifiable\'', () => {
    const schema = new Schema('dir', 'slug', '{}');
    const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.IDENTIFIABLE);
    expect(headerAttributes.length).toEqual(0);
  });
  test('single property as array', () => {
    const schema = new Schema('dir', 'slug', '{}');
    const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, [EHeaderAttribute.ABSTRACT]);
    expect(headerAttributes.length).toEqual(1);
    expect(headerAttributes[0]).toEqual('- **Abstract**: Yes');
  });
  test('properties come in the right order', () => {
    const schema = new Schema('dir', 'slug', '{}');
    const headerAttributes = new HeaderAttributeFormatter().getAttributeList(
      schema,
      [EHeaderAttribute.ABSTRACT, EHeaderAttribute.STATUS, EHeaderAttribute.EXTENSIBLE, EHeaderAttribute.ADDITIONAL_ITEMS]);

    expect(headerAttributes.length).toEqual(4);
    expect(headerAttributes[0]).toEqual('- **Abstract**: Yes');
    expect(headerAttributes[1]).toEqual('- **Status**: Unknown');
    expect(headerAttributes[2]).toEqual('- **Extensible**: Undefined');
    expect(headerAttributes[3]).toEqual('- **Additional items**: Undefined');
  });
  test('properties as horizontal table', () => {
    const schema = new Schema('dir', 'slug', '{}');
    const headerAttributes = new HeaderAttributeFormatter().getHorizontalAttributeTable(
      schema,
      [EHeaderAttribute.ABSTRACT, EHeaderAttribute.STATUS, EHeaderAttribute.EXTENSIBLE, EHeaderAttribute.ADDITIONAL_PROPERTIES]);
    expect(headerAttributes.length).toEqual(3);
    expect(headerAttributes[0]).toEqual('| Abstract | Status | Extensible | Additional properties |');
    expect(headerAttributes[1]).toEqual('| --- | --- | --- | --- |');
    expect(headerAttributes[2]).toEqual('| Yes | Unknown | Undefined | Undefined |');
  });
});
//#endregion

//#region single property
describe.each([
  [EHeaderAttribute.ABSTRACT, '- **Abstract**: Yes'],
  [EHeaderAttribute.ADDITIONAL_ITEMS, '- **Additional items**: Undefined'],
  [EHeaderAttribute.ADDITIONAL_PROPERTIES, '- **Additional properties**: Undefined'],
  [EHeaderAttribute.EXTENSIBLE, '- **Extensible**: Undefined'],
  [EHeaderAttribute.STATUS, '- **Status**: Unknown']
])('Single header property', (value: EHeaderAttribute, expected: string) => {
  const schema = new Schema('dir', 'slug', '{}');
  const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, value);
  test(`${value} array length`, () => expect(headerAttributes.length).toEqual(1));
  test(`${value} string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region abstract
describe.each([
  ['{}', '- **Abstract**: Yes'],
  ['{ "properties": [] }', '- **Abstract**: No']
])('Abstract', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', schemaString);
  const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.ABSTRACT);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region additional items
describe.each([
  ['{}', '- **Additional items**: Undefined'],
  ['{ "additionalItems": true }', '- **Additional items**: Allowed'],
  ['{ "additionalItems": false }', '- **Additional items**: Forbidden']
])('Additional Items', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', schemaString);
  const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.ADDITIONAL_ITEMS);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region additional properties
describe.each([
  ['{}', '- **Additional properties**: Undefined'],
  ['{ "additionalProperties": true }', '- **Additional properties**: Allowed'],
  ['{ "additionalProperties": false }', '- **Additional properties**: Forbidden']
])('Additional Items', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', schemaString);
  const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.ADDITIONAL_PROPERTIES);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region extensible
describe.each([
  ['{}', '- **Extensible**: Undefined'],
  ['{ "definitions": [] }', '- **Extensible**: Yes'],
  ['{ "meta:extensible": false }', '- **Extensible**: No'],
  ['{ "meta:extensible": true }', '- **Extensible**: Yes'],
  ['{ "meta:extensible": true, "definitions": [] }', '- **Extensible**: Yes']
])('Additional Items', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', schemaString);
  const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.EXTENSIBLE);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region status
describe.each([
  ['{}', '- **Status**: Unknown'],
  ['{ "deprecated": true }', '- **Status**: Deprecated'],
  ['{ "meta:status": "stable" }', '- **Status**: Stable'],
  ['{ "meta:status": "stabilizing" }', '- **Status**: Stabilizing'],
  ['{ "meta:status": "experimental" }', '- **Status**: Experimental'],
  ['{ "meta:status": "bullshit" }', '- **Status**: Unknown'],
  ['{ "meta:status": "" }', '- **Status**: Unknown'],
  ['{ "meta:status": null }', '- **Status**: Unknown'],
  ['{ "deprecated": true, "meta:status": "stable" }', '- **Status**: Deprecated'],
])('Status', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', schemaString);
  const headerAttributes = new HeaderAttributeFormatter().getAttributeList(schema, EHeaderAttribute.STATUS);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion