import { Schema } from "../schema/schema";
import { ESchemaLevel } from "../schema/schema-level.enum";
import { SchemaFormatter } from "./schema-formatter";

describe.each([
  ['{}', 0],
  ['{ "default" : null }', 0],
  ['{ "default" : "" }', 4],
  ['{ "default" : "test string" }', 4],
  ['{ "default" : { "from": "2020.01.01", "to": "2020.12.31" } }', 4]
])('get default', (schemaString: string, lines: number) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const schemaFormatter = new SchemaFormatter();
  const result = schemaFormatter.getDefault(schema);
  test('length', () => expect(result.length).toEqual(lines));
})

describe.each([
  ['{}', 0],
  ['{ "default" : null }', 0],
  ['{ "default" : "" }', 4],
  ['{ "default" : "test string" }', 4],
  ['{ "default" : { "from": "2020.01.01", "to": "2020.12.31" } }', 4]
])('get default', (schemaString: string, lines: number) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.DEFINITION, schemaString);
  const schemaFormatter = new SchemaFormatter();
  const result = schemaFormatter.getDefault(schema);
  test('length', () => expect(result.length).toEqual(lines));
})

describe.each([
  ['{}', 0],
  ['{ "examples": "" }', 0],
  ['{ "examples": null }', 0],
  ['{ "examples": 5 }', 0],
  ['{ "examples": [] }', 0],
  ['{ "examples": [ 1 ] }', 1],
  ['{ "examples": [ "test string" ] }', 1],
  ['{ "examples": [ "" ] }', 1],
  ['{ "examples": [ null ] }', 1],
  ['{ "examples": [ { "property": "value" } ] }', 1],
  ['{ "examples": [ { "property": "value" }, { "other": "value", "one": "two" } ] }', 2],
  ['{ "examples": [ { "property": "value" }, null ] }', 2],
  ['{ "examples": [ 1, 2 ] }', 2],
  ['{ "examples": [ 1, null ] }', 2],
  ['{ "examples": [ "test string", "another" ] }', 2],
  ['{ "examples": [ "", "test string" ] }', 2],
  ['{ "examples": [ "", "" ] }', 2],
  ['{ "examples": [ "", null ] }', 2],
  ['{ "examples": [ null, null ] }', 2],

])('get examples', (schemaString: string, lines: number) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.ROOT, schemaString);
  const schemaFormatter = new SchemaFormatter();
  const result = schemaFormatter.getExamples(schema);
  test('length', () => expect(result.length).toEqual(lines > 0 ? (lines * 3) + 1 : 0));
})

describe.each([
  ['{}', 0],
  ['{ "examples": "" }', 0],
  ['{ "examples": null }', 0],
  ['{ "examples": 5 }', 0],
  ['{ "examples": [] }', 0],
  ['{ "examples": [ 1 ] }', 1],
  ['{ "examples": [ "test string" ] }', 1],
  ['{ "examples": [ "" ] }', 1],
  ['{ "examples": [ null ] }', 1],
  ['{ "examples": [ { "property": "value" } ] }', 1],
  ['{ "examples": [ { "property": "value" }, { "other": "value", "one": "two" } ] }', 2],
  ['{ "examples": [ { "property": "value" }, null ] }', 2],
  ['{ "examples": [ 1, 2 ] }', 2],
  ['{ "examples": [ 1, null ] }', 2],
  ['{ "examples": [ "test string", "another" ] }', 2],
  ['{ "examples": [ "", "test string" ] }', 2],
  ['{ "examples": [ "", "" ] }', 2],
  ['{ "examples": [ "", null ] }', 2],
  ['{ "examples": [ null, null ] }', 2],

])('get examples', (schemaString: string, lines: number) => {
  const schema = new Schema('dir', 'slug', ESchemaLevel.DEFINITION, schemaString);
  const schemaFormatter = new SchemaFormatter();
  const result = schemaFormatter.getExamples(schema);
  test('length', () => expect(result.length).toEqual(lines > 0 ? (lines * 3) + 1 : 0));
})
