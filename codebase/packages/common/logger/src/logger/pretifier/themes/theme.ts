import { Theme } from 'cli-highlight';
import chalk from 'chalk';

import { LEVELS, LEVEL_NAMES } from '../constants';
import { DefaultTheme } from './default-theme';
import { PlainTheme } from './plain-theme';


/**
 * 
 */
export type Colorizer = (input: string) => string;

/**
 * 
 * @param input 
 * @returns 
 */
export const nocolor: Colorizer = (input: string) => { return input };

/**
 * 
 */
export type HighlightFunction = chalk.ChalkFunction | Colorizer;

/**
 * 
 */
export interface HighlightTheme extends Theme {

   /**
    * 
    */
   logLevels: Record<string | number, HighlightFunction>,

   /**
    * Using to colorize message
    */
   message: HighlightFunction,
   
   /**
    * Using to colorize grey message
    */
   greyMessage: HighlightFunction,
   
   /**
    * Using to colorize time
    */
   time: HighlightFunction,

   /**
    * 
    * @param level 
    */
   colorizeLevel?(level: number | string): string,
}

/**
 * 
 * @param level 
 * @param colorizer 
 * @returns 
 */
export function defaultColorizeLevel (level: number | string, colorizer: HighlightTheme) {
   if (Number.isInteger(+level) && typeof level === 'number') {
      return Object.prototype.hasOwnProperty.call(LEVELS, level)
        ? colorizer.logLevels[level](LEVELS[level])
        : colorizer.logLevels.default(LEVELS.default)
   }

   const levelString = typeof level === 'string' ? level.toLowerCase() : 'default';
   const levelNum = LEVEL_NAMES[levelString] || 'default'
   return colorizer.logLevels[levelNum](LEVELS[levelNum])
}

/**
 * Factory function get a function to colorized levels. The returned function
 * also includes a `.message(str)` method to colorize strings.
 *
 * @param {boolean} [useColors=false] When `true` a function that applies standard
 * terminal colors is returned.
 *
 * @returns {HighlightTheme} `HighlightTheme` has a `.message(str)` method to
 * apply colorization to a string. The `colorizeLevel` function accepts either an integer
 * `level` or a `string` level. The integer level will map to a known level
 * string or to `USERLVL` if not known.  The string `level` will map to the same
 * colors as the integer `level` and will also default to `USERLVL` if the given
 * string is not a recognized level name.
 */
export function getTheme(useColors: boolean = false): HighlightTheme  {
   return useColors ? DefaultTheme : PlainTheme
}
