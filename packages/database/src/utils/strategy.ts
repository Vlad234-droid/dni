import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface {
  toSnakeCase(items: string[], separator = '_'): string {
    return items.join(separator);
  }

  tableName(className: string, customName: string): string {
    return customName ? customName : snakeCase(className);
  }

  columnName(
    propertyName: string,
    customName: string,
    embeddedPrefixes: string[],
  ): string {
    return (
      snakeCase(embeddedPrefixes.concat('').join('_')) +
      (customName ? customName : snakeCase(propertyName))
    );
  }

  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(this.toSnakeCase([relationName, referencedColumnName]));
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
  ): string {
    return snakeCase(
      this.toSnakeCase([
        firstTableName,
        firstPropertyName.replace(/\./gi, '_'),
        secondTableName,
      ]),
    );
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return snakeCase(
      this.toSnakeCase([tableName, columnName ? columnName : propertyName]),
    );
  }

  classTableInheritanceParentColumnName(
    parentTableName: string,
    parentTableIdPropertyName: string,
  ): string {
    return snakeCase(
      this.toSnakeCase([parentTableName, parentTableIdPropertyName]),
    );
  }

  eagerJoinRelationAlias(alias: string, propertyPath: string): string {
    return this.toSnakeCase([alias, propertyPath.replace('.', '_')], '__');
  }
}
