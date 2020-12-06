export enum ESchemaAttribute {
  ADDITIONAL_ITEMS = 'additionalItems',
  ADDITIONAL_PROPERTIES = 'additionalProperties',
  DEFAULT = 'default',
  DEFINITIONS = 'definitions',
  DEPRECATED = 'deprecated',
  DESCRIPTION = 'description',
  EXAMPLES = 'examples',
  EXTENSIBLE = 'meta:extensible',
  ID = '$id',
  // Pseudo attributes are attributes that are getters on the schema and not keywords of jsonschema
  PSEUDO_ABSTRACT = 'abstract',
  PSEUDO_CUSTOM = 'custom',
  PSEUDO_IDENTIFIABLE = 'identifiable',
  PSEUDO_IS_NULLABLE = 'isNullable',
  PSEUDO_IS_REQUIRED = 'isRequired',
  PSEUDO_STATUS = 'meta:status',
  PROPERTIES = 'properties',
  REQUIRED = 'required',
  READ_ONLY = 'readOnly',
  SCHEMA = '$schema',
  TITLE = 'title',
  TYPE = 'type',
  WRITE_ONLY = 'writeOnly'
  // TODO maxProperties / minProperties
  // TODO patternProperties
}