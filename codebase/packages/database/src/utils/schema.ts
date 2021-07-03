import { getManager } from 'typeorm';

interface ConnectionOptionsWithSchema {
  schema?: string;
}

const getSchema = () => {
  const connection = getManager().connection;
  return (connection.options as ConnectionOptionsWithSchema).schema;
};

const getSchemaPrefix = () => {
  const schema = getSchema();
  return schema ? `"${schema}".` : '';
};

export { getSchema, getSchemaPrefix };
