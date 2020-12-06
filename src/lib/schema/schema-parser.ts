import BananaSlug from 'github-slugger';
import * as Collections from 'typescript-collections';
import { Schema } from "./schema";
import { ESchemaAttribute } from './schema-attribute.enum';
import { ESchemaLevel } from './schema-level.enum';

export class SchemaParser {

  //#region public methods
  public parseSchemas(rawSchemas: Collections.Dictionary<string, Schema>): Collections.Dictionary<string, Schema> {
    rawSchemas.forEach( (key: string, schema: Schema) => this.processDefinitions(key, schema));
    rawSchemas.forEach((key: string, schema: Schema) => this.processProperties(key, schema));
    return rawSchemas;
  }
  //#endregion

  //#region private methods: main process methods
  private processDefinitions(key: string, schema: Schema): void {
    if (schema.property(ESchemaAttribute.DEFINITIONS)) {
      const parsed = Object.entries(schema.property(ESchemaAttribute.DEFINITIONS) as Record<string, unknown>);
      parsed.forEach(prop => {
        schema.properties.set(
          prop[0],
          new Schema('dir', BananaSlug.slug(prop[0]), ESchemaLevel.DEFINITION, JSON.stringify(prop[1])));
      });
    } else {
      console.log('No definitions found');
    }

  }

  private processProperties(key: string, schema: Schema): void {
    if (schema.property(ESchemaAttribute.PROPERTIES)) {
      const parsed = Object.entries(schema.property(ESchemaAttribute.PROPERTIES) as Record<string, unknown>);
      parsed.forEach(prop => {
        schema.properties.set(
          prop[0],
          new Schema('dir', BananaSlug.slug(prop[0]), ESchemaLevel.PROPERTY, JSON.stringify(prop[1])));
      });
    } else {
      console.log('No properties found');
    }

  }
  //#endregion
}