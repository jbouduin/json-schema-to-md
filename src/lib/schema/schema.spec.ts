import { Schema } from "./schema";

describe.each([
  ['{}', true],
  ['{ "properties": [] }', false]
])('Abstract vs. non abstract', (schemaString: string, abstract: boolean) => {
  const dir = 'dir';
  const slug = 'slug';
  const schema = new Schema('dir', 'slug', schemaString);

  test('directory set', () => expect(schema.directory).toEqual(dir));
  test('slug set', () => expect(schema.slug).toEqual(slug));
  test('abstract', () => expect(schema.abstract).toEqual(abstract));
});

describe.each([
  ['{}', 0],
  ['{ "required": [] }', 0],
  ['{ "required": [ "a" ] }', 1],
  ['{ "required": [ "a", "b" ] }', 2]
])('required', (schemaString: string, length: number) => {
  const schema = new Schema('dir', 'slug', schemaString);
  test('length of array', () => expect(schema.required.length).toEqual(length));
  if (schema.required.length === 1) {
    test('first element', () => expect(schema.required[0]).toEqual('a'));
  }
  if (schema.required.length === 2) {
    test('second element', () => expect(schema.required[1]).toEqual('b'));
  }
});

describe.each([
  ['{ "properties": { "a": { "a": "value" } } }', false],
  ['{ "properties": { "a": { "a": "value" } }, "required": [] }', false],
  ['{ "properties": { "a": { "a": "value" } }, "required": [ "a" ] }', true],
  ['{ "properties": { "a": { "a": "value" } }, "required": [ "a", "b" ] }', true]
])('is property required', (schemaString: string, expected: boolean) => {
  const schema = new Schema('dir', 'slug', schemaString);
  test('result', () => expect(schema.isRequired("a")).toEqual(expected));
});

describe.each([
  ['{}'],
  ['{ "properties": null }'],
  ['{ "properties": {} }'],
  ['{ "properties": null }'],
  ['{ "properties": {} }']
])('definitions and properties', (schemaString: string) => {
  const schema = new Schema('dir', 'slug', schemaString);
  test('definitions instantiated', () => expect(schema.definitions).toBeDefined());
  test('properties instantiated', () => expect(schema.properties).toBeDefined());
});

describe.each([
  ['{}', 1, [ 'Undefined' ]],
  ['{ "type": null }', 1, ['Undefined']],
  ['{ "type": "" }', 1, ['Undefined']],
  ['{ "type": 5 }', 1, ['Invalid value']],
  ['{ "type": [ "string" ] }', 1, ['string']],
  ['{ "type": [ "string", "null" ] }', 2, ['string', 'null']]
])('type as array', (schemaString: string, length: number, values: Array<string>) => {
  const schema = new Schema('dir', 'slug', schemaString);
  test('length of array', () => expect(schema.type.length).toEqual(length));
  values.forEach((value: string, index: number) =>
    test(`value @${index}`, () => expect(schema.type[index]).toEqual(value))
  );
});

describe.each([
  ['{}', false],
  ['{ "type": null }', false],
  ['{ "type": "" }', false],
  ['{ "type": 5 }', false],
  ['{ "type": [ "string" ] }', false],
  ['{ "type": [ "true" ] }', false],
  ['{ "type": [ "string", "null" ] }', true]
])('isNullable', (schemaString: string, expected: boolean) => {
  const schema = new Schema('dir', 'slug', schemaString);
  test('value', () => expect(schema.isNullable).toEqual(expected));
});

describe.each([
  ['object', true],
  ['string', true],
  ['number', true],
  ['integer', true],
  ['array', true],
  ['boolean', true],
  [5, false],
  ['other', false]
])('type validation', (value: string | number, valid: boolean) => {
  const schema = new Schema('dir', 'slug', `{ "type": "${value}" }`);
  test('length of array', () => expect(schema.type.length).toEqual(1));
  if (valid) {
    test('validity check succeeded', () => expect(schema.type[0]).toEqual(value));
  } else {
    test('validity check succeeded', () => expect(schema.type[0]).toEqual('Invalid value'));
  }

});