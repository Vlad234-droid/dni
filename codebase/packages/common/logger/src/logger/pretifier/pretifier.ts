import chalk from 'chalk';
import jmespath from 'jmespath';
import { parse } from '@hapi/bourne';
import pretty from 'pino-pretty';

import { getTheme, HighlightTheme } from './themes';
import { ERROR_LIKE_KEYS, MESSAGE_KEY, TIMESTAMP_KEY } from './constants';
import { 
   isObject, 
   prettifyErrorLog, 
   prettifyLevel, 
   prettifyMessage, 
   prettifyMetadata, 
   prettifyObject, 
   prettifyTime, 
   filterLog,
} from './utils';


/**
 * 
 */
export interface PrettyOptions extends pretty.PrettyOptions {

  /**
   * cli-highlight them to use
   */
  theme?: HighlightTheme
}

export type PrettyFactory = (options: pretty.PrettyOptions) => pretty.Prettifier;

const defaultOptions: pretty.PrettyOptions = {
   colorize: !!chalk.supportsColor,
   crlf: false,
   errorLikeObjectKeys: ERROR_LIKE_KEYS,
   errorProps: '',
   levelFirst: false,
   messageKey: MESSAGE_KEY,
   messageFormat: false,
   timestampKey: TIMESTAMP_KEY,
   translateTime: false,
   customPrettifiers: {},
   hideObject: false,
   singleLine: false
}

/**
 * 
 * @param overridedOptions 
 * @returns 
 */
export function prettifierFactory (overridedOptions?: PrettyOptions): PrettyFactory {

  return (options: pretty.PrettyOptions): pretty.Prettifier => {

    const opts = Object.assign({}, defaultOptions, options, overridedOptions);

    const EOL = opts.crlf ? '\r\n' : '\n';
    const IDENT = '    ';
    const messageKey: string = opts.messageKey!;
    const levelKey: string = opts.levelKey!;
    const levelLabel = opts.levelLabel;
    const messageFormat = opts.messageFormat;
    const timestampKey: string = opts.timestampKey!;
    const errorLikeObjectKeys: string[] = opts.errorLikeObjectKeys!;
    const errorProps: string[] | undefined = opts.errorProps ? opts.errorProps.split(',') : undefined;
    const customPrettifiers = opts.customPrettifiers;
    const ignoreKeys = opts.ignore ? new Set(opts.ignore.split(',')) : undefined;
    const hideObject = opts.hideObject;
    const singleLine = opts.singleLine;
  
    const theme = opts.theme || getTheme(!!opts.colorize);
    const search = opts.search;
  
    const jsonParser = (input: string) => {
      try {
         return { value: parse(input, undefined, { protoAction: 'remove' }) };
      } catch (err) {
         return { err };
      }
    }
    
    return (inputData: string | object): string => {
      let log: any;
      if (!isObject(inputData)) {
        const parsed = jsonParser(inputData as string)
        if (parsed.err || !isObject(parsed.value)) {
          // pass through
          return inputData + EOL;
        }
        log = parsed.value;
      } else {
        log = inputData;
      }
  
      if (search && !jmespath.search(log, search)) {
        return '';
      }
  
      const prettifiedMessage = prettifyMessage({ log, messageKey, theme, messageFormat, levelLabel })
  
      if (ignoreKeys) {
        log = filterLog(log, Array.from(ignoreKeys?.values()));
      }
  
      const prettifiedLevel = prettifyLevel({ log, theme, levelKey });
      const prettifiedMetadata = prettifyMetadata({ log });
      const prettifiedTime = prettifyTime({ log, translateFormat: opts.translateTime, theme, timestampKey });
  
      let line = '';
      if (opts.levelFirst && prettifiedLevel) {
        line = `${prettifiedLevel}`;
      }
  
      if (prettifiedTime && line === '') {
        line = `${prettifiedTime}`;
      } else if (prettifiedTime) {
        line = `${line} ${prettifiedTime}`;
      }
  
      if (!opts.levelFirst && prettifiedLevel) {
        if (line.length > 0) {
          line = `${line} ${prettifiedLevel}`;
        } else {
          line = prettifiedLevel;
        }
      }
  
      if (prettifiedMetadata) {
        if (line.length > 0) {
          line = `${line} ${prettifiedMetadata}:`;
        } else {
          line = prettifiedMetadata;
        }
      }
  
      if (line.endsWith(':') === false && line !== '') {
        line += ':';
      }
  
      if (prettifiedMessage) {
        if (line.length > 0) {
          line = `${line} ${prettifiedMessage}`;
        } else {
          line = prettifiedMessage;
        }
      }
  
      if (line.length > 0 && !singleLine) {
        line += EOL;
      }
  
      if (log.type === 'Error' && log.stack) {
        const prettifiedErrorLog = prettifyErrorLog({
          log,
          errorLikeKeys: errorLikeObjectKeys,
          errorProperties: errorProps || [],
          ident: IDENT,
          eol: EOL,
        });
  
        // In single line mode, include a space only if prettified version isn't empty
        if (singleLine && !/^\s$/.test(prettifiedErrorLog)) {
          line += ' ';
        }
        line += prettifiedErrorLog;
      } else if (!hideObject) {
        const skipKeys = [messageKey, levelKey, timestampKey].filter(key => typeof log[key] === 'string' || typeof log[key] === 'number')
        const prettifiedObject = prettifyObject({
          input: log,
          skipKeys,
          customPrettifiers,
          errorLikeKeys: errorLikeObjectKeys,
          eol: EOL,
          ident: IDENT,
          singleLine,
          theme,
        });
  
        // In single line mode, include a space only if prettified version isn't empty
        if (singleLine && !/^\s$/.test(prettifiedObject)) {
          line += ' ';
        }
        line += prettifiedObject;
      }
  
      return line;
    }
  }
}

/**
 * 
 * @param options 
 * @returns 
 */
export default function defaultPrettifier(options: pretty.PrettyOptions): pretty.Prettifier {
  return prettifierFactory()(options);
}
