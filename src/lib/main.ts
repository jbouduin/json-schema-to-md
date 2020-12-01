import fs from 'fs';
import nodepath from 'path';
import yargs from 'yargs';
import { HeaderAttributeFormatter } from './markdown/header-attribute-formatter';
import { IMarkDownWriter, MarkDownWriter } from './markdown/markdown-writer';
import { ReadMeWriter } from './markdown/readme-writer';
import { ISchemaWriter, SchemaWriter } from './markdown/schema-writer';
import { ESchemaAttribute } from './schema/schema-attribute.enum';
import { ISchemaLoader, SchemaLoader } from './schema/schema-loader';

export class Main {

  //#region main block
  public process(args: Array<string>): void {
    console.log(args);
    const { argv } = yargs(args)
      .usage('Generate Markdown documentation from JSON Schema.\n\nUsage: $0')
      // the directory containing the schema files
      .demand('d')
      .alias('d', 'input')
      .describe('d', 'path to directory containing all JSON Schemas or a single JSON Schema file. This will be considered as the baseURL. By default only files ending in .schema.json will be processed, unless the schema-extension is set with the -e flag.')
      .coerce('d', (d: string) => {
        const resolved = nodepath.resolve(d);
        if (fs.existsSync(resolved) && fs.lstatSync(d).isDirectory()) {
          return resolved;
        }
        throw new Error(`Input file "${d}" is not a directory!`);
      })
      // process the directory recursively
      .boolean('r')
      .alias('r', 'recursive')
      .describe('r', 'process subdirectories')
      // the output directory
      .alias('o', 'out')
      .describe('o', 'path to output directory')
      .default('o', nodepath.resolve(nodepath.join('.', 'out')))
      .coerce('o', (o: string) => nodepath.resolve(o))
      // the extension for jsonschema files
      .alias('e', 'schema-extension')
      .describe('e', 'JSON Schema file extension eg. schema.json or json')
      .default('e', 'schema.json')

    console.log(argv);
    const loader = new SchemaLoader(argv.d || '', argv.e || '', argv.r || false) as ISchemaLoader;
    const rawSchemas = loader.load();

    rawSchemas.keys().forEach(key => {
      const value = rawSchemas.getValue(key);
      console.log('=======================================================================');
      console.log(key);
      console.log('-----------------------------------------------------------------------');
      console.log('$schema:', value?.property(ESchemaAttribute.SCHEMA));
      console.log('$id:', value?.property(ESchemaAttribute.ID));
      console.log('title:', value?.property(ESchemaAttribute.TITLE));
      console.log('description:', value?.property(ESchemaAttribute.TITLE));
      console.log('abstract:', value?.abstract);
      console.log('directory', value?.directory);
      console.log('slug', value?.slug);
    });

    console.log('=======================================================================');
    const markDownWriter = new MarkDownWriter(argv.o || '.') as IMarkDownWriter;
    new ReadMeWriter(markDownWriter).write(rawSchemas);
    const schemaWriter = new SchemaWriter(markDownWriter, new HeaderAttributeFormatter()) as ISchemaWriter;
    rawSchemas.values().forEach(schema => schemaWriter.write(schema));
  }
  //#endregion
}