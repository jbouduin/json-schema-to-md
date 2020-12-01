import fs from 'fs';
import BananaSlugger from 'github-slugger';
import { glob } from 'glob';
import path from 'path';
import * as Collections from 'typescript-collections';

import { Schema } from './schema';
import { ESchemaAttribute } from './schema-attribute-enum';

export interface ISchemaLoader {
  load(): Collections.Dictionary<string, Schema>;
}

export class SchemaLoader implements ISchemaLoader {

  //#region private properties
  private recursive: boolean;
  private schemaDirectory: string;
  private schemaExtension: string;
  private slugger: BananaSlugger;
  //#endregion

  //#region constructor
  public constructor(schemaDirectory: string, schemaExtension: string, recursive: boolean) {
    this.recursive = recursive;
    this.schemaDirectory = schemaDirectory;
    this.schemaExtension = schemaExtension;
    this.slugger = new BananaSlugger();
  }
  //#endregion

  //#region ISchemaLoader interface methods
  public load(): Collections.Dictionary<string, Schema> {
    const rawSchemas = new Collections.Dictionary<string, Schema>();
    this.getSchemaFileList().forEach(file => {
      const schema = this.loadSingleFile(file);
      const id = schema.property(ESchemaAttribute.ID) as string;
      rawSchemas.setValue(id, schema);
    });
    return rawSchemas;
  }
  //#endregion

  //#region private helper methods
  private loadSingleFile(filename: string): Schema {
    const data = fs.readFileSync(filename, 'utf8');
    const schema = new Schema(
      path.relative(this.schemaDirectory, path.dirname(filename)),
      this.slugger.slug(path.basename(filename).replace(/\./gi, '-')),
      data);
    return schema;
  }

  private getSchemaFileList(): Array<string> {
    const pattern = `${this.schemaDirectory}/${this.recursive ? '**/' : ''}*.${this.schemaExtension}`;
    console.log(pattern);
    const schemaFiles = glob.sync(pattern);
    console.log(schemaFiles);
    if (schemaFiles.length === 0) {
      console.error("No schemafiles found");
    } else {
      console.log(`loading ${schemaFiles.length} schemas`);
    }
    return schemaFiles;
  }
  //#endregion
}