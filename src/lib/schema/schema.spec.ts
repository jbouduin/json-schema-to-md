import { HeaderPropertiesList } from "./header-properties/header-properties-list";
import { Schema } from "./schema"

describe.each([
  ['{}', true],
  ['{ "properties": [] }', false]
])('Abstract vs. non abstract', (schemaString: string, abstract: boolean) => {
  const dir = 'dir';
  const slug = 'slug';
  const schema = new Schema(dir, slug, schemaString);

  test('directory set', () => expect(schema.directory).toEqual(dir));
  test('slug set', () => expect(schema.slug).toEqual(slug));
  test('abstract', () => expect(schema.abstract).toEqual(abstract));
  test('headerPropertylist instantiated', () => expect(schema.headerPropertiesList).toBeInstanceOf(HeaderPropertiesList));
})

// describe.each([
//   ['{}', 'Unknown'],
//   ['{ "properties": [] }', 'false']
// ])('Status', (schemaString: string, status: string) => {
//   const dir = 'dir';
//   const slug = 'slug';
//   const schema = new Schema(dir, slug, schemaString);

//   // test('abstract', () => expect(schema.status).toEqual(abtract));
//   test('headerPropertylist instantiated', () => expect(schema.headerPropertiesList).toBeInstanceOf(HeaderPropertiesList));
// })