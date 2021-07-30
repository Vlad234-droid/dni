import pino from 'pino';
//import pinoPretty from 'pino-pretty';

import { jsonHighlight } from './pretify';
import { prettifierFactory } from './pretifier';
import { AndroidStudioTheme } from './pretifier/themes';


/**
 * 
 */
class ApplicationLogger {

   private static instance: ApplicationLogger;

   private readonly rootLogger: pino.Logger;
   // private readonly rootLoggerName: string;

   // see: https://highlightjs.org/static/demo/
   // private readonly themeName: string = 'Night Owl';

   private constructor(rootLoggerName: string) {
      // this.rootLoggerName = rootLoggerName;
      this.rootLogger = pino({
         name: rootLoggerName,
         level: 'trace',
         prettyPrint: {
            suppressFlushSyncWarning: true,
         },
         prettifier: prettifierFactory({
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss o',
            ignore: 'pid,hostname',
            customPrettifiers: {
               '*': jsonHighlight,
            },
            theme: AndroidStudioTheme,
         }),
      });

      (this.rootLogger as any).name = rootLoggerName;
   }   
   
   public getLogger(): pino.Logger {
      return this.rootLogger;
   }

   public createLogger(bindings?: pino.Bindings, rootLogger?: pino.Logger): pino.Logger {
      const rootName = rootLogger 
         ? (rootLogger as any).name
         : (this.rootLogger as any).name;

      let childLoggerName: string | undefined = undefined;
      if (rootName && typeof rootName === 'string') {
         if (bindings?.name) {
            if (bindings?.overrideName) {
               childLoggerName = bindings.name;
            } else {
               childLoggerName = `${rootName}.${bindings.name}`;
            }
         } else {
            childLoggerName = rootName;
         }
      } else {
         if (bindings?.name) {
            childLoggerName = bindings.name;
         }
      }

      const childBindings = {
         ...bindings, 
         name: childLoggerName,
      };
      
      const childLogger = rootLogger 
         ? rootLogger.child(childBindings)
         : this.rootLogger.child(childBindings);

      (childLogger as any).name = childLoggerName;

      return childLogger;
   }

   static getInstance(): ApplicationLogger {
      if (!this.instance) {
         throw new Error(`Pino logger subsystem is not yet initialized. Use initialize() to init.`);
      }
      return this.instance;
   }

   static initialize(rootLoggerName: string): pino.Logger {
      if (this.instance) {
         throw new Error(`Pino logger is already initialized.`);
      }
      this.instance = new this(rootLoggerName);
      return this.instance.rootLogger;
   }
}

export const initialize = (rootLoggerName: string) => ApplicationLogger.initialize(rootLoggerName);

export const createLogger = (bindings?: pino.Bindings) => ApplicationLogger.getInstance().createLogger(bindings);

export const getLogger = () => ApplicationLogger.getInstance().getLogger();
