/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as Collections from 'typescript-collections';
import { Schema } from '../schema/schema';
import { ESchemaAttribute } from '../schema/schema-attribute.enum';
import { IMarkDownWriter } from './markdown-writer';

export interface IReadMeWriter {
  write(rawSchemas: Collections.Dictionary<string, Schema>): void;
}

export class ReadMeWriter implements IReadMeWriter {

  //#region private properties
  private writer: IMarkDownWriter;
  //#endregion

  //#region constructor
  public constructor(writer: IMarkDownWriter) {
    this.writer = writer;
  }
  //#endregion

  //#region IReadMeWriter interface methods
  public write(schemas: Collections.Dictionary<string, Schema>): void {
    console.log('building readme');
    const readme = this.buildReadMe(schemas);
    this.writer.writeFile('README.md', readme)
  }
  //#endregion

  //#region private methods
  private buildReadMe(schemas: Collections.Dictionary<string, Schema>): Array<string> {
    const versionNote = schemas.values().length > 0 ?
      `The schemas linked above follow the JSON Schema Spec version: \`${schemas.values()[0].property(ESchemaAttribute.SCHEMA)}\`` :
      'No schemas found';
    return new Array<string>(
      '## Top level',
      ...this.buildTopLevel(schemas, (s) => !s.abstract),
      '## Definitions',
      ...this.buildTopLevel(schemas, (s) => s.abstract),
      '## Version note',
      versionNote
    );
  }

  private buildTopLevel(rawSchemas: Collections.Dictionary<string, Schema>, filter: (schema: Schema) => boolean): Array<string> {
    const result = new Array<string>();
    rawSchemas.keys().forEach(key => {
      const value = rawSchemas.getValue(key);
      if (value && filter(value)) {
        result.push(`- [${value.property(ESchemaAttribute.TITLE)}](${value.directory}/${value.slug}) \`${value.property(ESchemaAttribute.ID)}\``);
      }
    });
    return result;
  }
  //#endregion

}