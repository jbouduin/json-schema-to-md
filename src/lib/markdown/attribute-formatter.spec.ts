import { ESchemaAttribute } from '../schema/schema-attribute.enum';
import { Schema } from '../schema/schema';
import { AttributeFormatter } from './attribute-formatter';
import { ESchemaLevel } from '../schema/schema-level.enum';

//#region general tests
describe('general tests', () => {
  test('single property as array', () => {
    const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, '{}');
    const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, [ESchemaAttribute.PSEUDO_ABSTRACT]);
    expect(headerAttributes.length).toEqual(1);
    expect(headerAttributes[0]).toEqual('- **Abstract**: Yes');
  });
  test('properties come in the right order', () => {
    const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, '{}');
    const headerAttributes = new AttributeFormatter().getAttributesAsList(
      schema,
      [ESchemaAttribute.PSEUDO_ABSTRACT, ESchemaAttribute.PSEUDO_STATUS, ESchemaAttribute.EXTENSIBLE, ESchemaAttribute.ADDITIONAL_ITEMS]);

    expect(headerAttributes.length).toEqual(4);
    expect(headerAttributes[0]).toEqual('- **Abstract**: Yes');
    expect(headerAttributes[1]).toEqual('- **Status**: Unknown');
    expect(headerAttributes[2]).toEqual('- **Extensible**: Undefined');
    expect(headerAttributes[3]).toEqual('- **Additional items**: Undefined');
  });
  test('properties as horizontal table', () => {
    const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, '{}');
    const headerAttributes = new AttributeFormatter().getAttributeValuesAsHorizontalTable(
      schema,
      [ESchemaAttribute.PSEUDO_ABSTRACT, ESchemaAttribute.PSEUDO_STATUS, ESchemaAttribute.EXTENSIBLE, ESchemaAttribute.ADDITIONAL_PROPERTIES]);
    expect(headerAttributes.length).toEqual(3);
    expect(headerAttributes[0]).toEqual('| Abstract | Status | Extensible | Additional properties |');
    expect(headerAttributes[1]).toEqual('| --- | --- | --- | --- |');
    expect(headerAttributes[2]).toEqual('| Yes | Unknown | Undefined | Undefined |');
  });
});
//#endregion

//#region single property
describe.each([
  [ESchemaAttribute.PSEUDO_ABSTRACT, '- **Abstract**: Yes'],
  [ESchemaAttribute.ADDITIONAL_ITEMS, '- **Additional items**: Undefined'],
  [ESchemaAttribute.ADDITIONAL_PROPERTIES, '- **Additional properties**: Undefined'],
  [ESchemaAttribute.EXTENSIBLE, '- **Extensible**: Undefined'],
  [ESchemaAttribute.READ_ONLY, '- **Read-only**: Undefined'],
  [ESchemaAttribute.PSEUDO_STATUS, '- **Status**: Unknown'],
  [ESchemaAttribute.WRITE_ONLY, '- **Write-only**: Undefined']
])('Single header property', (value: ESchemaAttribute, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, '{}');
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, value);
  test(`${value} array length`, () => expect(headerAttributes.length).toEqual(1));
  test(`${value} string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region abstract
describe.each([
  ['{}', '- **Abstract**: Yes'],
  ['{ "properties": [] }', '- **Abstract**: No']
])('Abstract', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.PSEUDO_ABSTRACT);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region additional items
describe.each([
  ['{}', '- **Additional items**: Undefined'],
  ['{ "additionalItems": true }', '- **Additional items**: Allowed'],
  ['{ "additionalItems": false }', '- **Additional items**: Forbidden']
])('Additional Items', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.ADDITIONAL_ITEMS);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region additional properties
describe.each([
  ['{}', '- **Additional properties**: Undefined'],
  ['{ "additionalProperties": true }', '- **Additional properties**: Allowed'],
  ['{ "additionalProperties": false }', '- **Additional properties**: Forbidden']
])('Additional properties', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.ADDITIONAL_PROPERTIES);
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
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.EXTENSIBLE);
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
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.PSEUDO_STATUS);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region isNullable
describe.each([
  ['{ "type": null }', '- **Nullable**: No'],
  ['{ "type": 5 }', '- **Nullable**: No'],
  ['{ "type": "string" }', '- **Nullable**: No'],
  ['{ "type": "null" }', '- **Nullable**: Yes'],
  ['{ "type": [ "string", "number" ]}', '- **Nullable**: No'],
  ['{ "type": [ "string", "null" ]}', '- **Nullable**: Yes']
])('IsNullable', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.PSEUDO_IS_NULLABLE);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

//#region type
describe.each([
  ['{ "type": null }', '- **Type**: `Undefined`'],
  ['{ "type": 5 }', '- **Type**: `Invalid value`'],
  ['{ "type": "string" }', '- **Type**: `string`'],
  ['{ "type": "null" }', '- **Type**: '],
  ['{ "type": [ "string", "number" ]}', '- **Type**: `string` `number`'],
  ['{ "type": [ "string", "null" ]}', '- **Type**: `string`']
])('IsNullable', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const headerAttributes = new AttributeFormatter().getAttributesAsList(schema, ESchemaAttribute.TYPE);
  test(`string value`, () => expect(headerAttributes[0]).toEqual(expected));
});
//#endregion

describe.each([
  [ESchemaAttribute.PSEUDO_CUSTOM],
  [ESchemaAttribute.PSEUDO_IDENTIFIABLE],
  [ESchemaAttribute.PSEUDO_IS_REQUIRED]
])('AttributeList with not supported ESchemaAttribute', (attribute: ESchemaAttribute) => {
  test(`'${attribute}'`, () => {
    const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, '{}');
    expect(() => new AttributeFormatter().getAttributesAsList(schema, attribute)).toThrowError(`${attribute} not supported`);
  });
});

describe.each([
  ['{ "properties": { "a": { "a": "value" } } }', '- **Required**: No'],
  ['{ "properties": { "a": { "a": "value" } }, "required": [] }', '- **Required**: No'],
  ['{ "properties": { "a": { "a": "value" } }, "required": [ "a" ] }', '- **Required**: Yes'],
  ['{ "properties": { "a": { "a": "value" } }, "required": [ "a", "b" ] }', '- **Required**: Yes']
])('IsRequired as single parameter', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const attributes = new AttributeFormatter().getParentDependentPropertyAttributeValuesAsList(schema, 'a', ESchemaAttribute.PSEUDO_IS_REQUIRED)
  test('string value', () => expect(attributes[0]).toEqual(expected));

});

describe.each([
  ['{ "properties": { "a": { "a": "value" } } }', '- **Required**: No'],
  ['{ "properties": { "a": { "a": "value" } }, "required": [] }', '- **Required**: No'],
  ['{ "properties": { "a": { "a": "value" } }, "required": [ "a" ] }', '- **Required**: Yes'],
  ['{ "properties": { "a": { "a": "value" } }, "required": [ "a", "b" ] }', '- **Required**: Yes']
])('IsRequired as array', (schemaString: string, expected: string) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const attributes = new AttributeFormatter().getParentDependentPropertyAttributeValuesAsList(schema, 'a', [ESchemaAttribute.PSEUDO_IS_REQUIRED])
  test('string value', () => expect(attributes[0]).toEqual(expected));

});

describe.each([
  [ESchemaAttribute.PSEUDO_IS_NULLABLE],
  [ESchemaAttribute.READ_ONLY]
])('ParentDependentPropertyAttributeValues with not supported ESchemaAttribute', (attribute: ESchemaAttribute) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, '{}');
  test(`'${attribute}'`, () => expect(() => new AttributeFormatter()
    .getParentDependentPropertyAttributeValues(schema, 'whatEver', attribute))
    .toThrowError(`${attribute} not supported`)
  );
});