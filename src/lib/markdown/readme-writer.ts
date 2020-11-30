import * as Collections from 'typescript-collections';
import { Schema } from '../schema/schema';
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
  public write(rawSchemas: Collections.Dictionary<string, Schema>): void {
    console.log('building readme');

    const readme = this.buildReadMe(rawSchemas);
    this.writer.writeFile('README.md', readme )
  }
  //#endregion

  //#region private methods
  private buildReadMe(rawSchemas: Collections.Dictionary<string, Schema>): Array<string> {
    return [
      '## Top level',
      ...this.buildTopLevel(rawSchemas, (s) => !s.isAbstract),
      '## Definitions',
      ...this.buildTopLevel(rawSchemas, (s) => s.isAbstract),
    ];
  }

  private buildTopLevel(rawSchemas: Collections.Dictionary<string, Schema>, filter: (schema: Schema) => boolean): Array<string> {
    const result = new Array<string>();
    rawSchemas.keys().forEach(key => {
      const value = rawSchemas.getValue(key);
      if (value && filter(value)) {
        result.push(`- [${value.title}](${value.directory}/${value.slug}) \`${value.$id}\``);
      }
    });
    return result;
  }
  //#endregion

}