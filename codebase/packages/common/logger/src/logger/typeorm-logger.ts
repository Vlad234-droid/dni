import { Logger, QueryRunner } from 'typeorm';
import pino from 'pino';
import { highlight } from 'cli-highlight';

import { AndroidStudioTheme } from './pretifier/themes';
import { getLogger } from './application-logger';


/**
 * 
 */
export class TypeOrmLogger implements Logger {

   private readonly logger: pino.Logger;

   constructor(name?: string) {
      const rootLogger = getLogger();
      this.logger = rootLogger.child({
         name: name || 'typeorm',
         prettyPrint: {
            customPrettifiers: {
               query: this.prettifyQuery
            }
         }
      });
   }

   /**
    * Logs query and parameters used in it.
    */
   logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
   }

   /**
    * Logs query that is failed.
    */
   logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
   }
   
   /**
    * Logs query that is slow.
    */
   logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
   }
   
   /**
    * Logs events from the schema build process.
    */
   logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
   }
   
   /**
    * Logs events from the migrations run process.
    */
   logMigration(message: string, queryRunner?: QueryRunner): any {
   }
   
   /**
    * Perform logging using given logger, or by default to the console.
    * Log has its own level and message.
    */
   log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): any {
   }
 
   prettifyQuery(query: string | object): string {
      if (typeof query === 'object') {
         return highlight(JSON.stringify(query, undefined, 3), { language: 'json', theme: AndroidStudioTheme });
      } else {
         return query;
      }
   }
}