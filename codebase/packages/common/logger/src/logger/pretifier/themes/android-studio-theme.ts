import chalk from 'chalk';
import { nocolor, HighlightTheme } from './theme';

const ctx = new chalk.Instance({ 'level': 3 });

/**
 * AndroidStudio Theme
 */
export const AndroidStudioTheme: HighlightTheme = {

   'keyword': ctx.rgb(0xcc, 0x78, 0x32),
   'built_in': ctx.cyan,
   'type': ctx.rgb(0xff, 0xc6, 0x6d),
   'literal': ctx.rgb(0x68, 0x97, 0xBB),
   'number': ctx.rgb(0x68, 0x97, 0xBB),
   'regexp': ctx.red,
   'string': ctx.rgb(0x6A, 0x87, 0x59),
   'subst': nocolor,
   'symbol': ctx.rgb(0x68, 0x97, 0xBB),
   'class': ctx.blue,
   'function': ctx.yellow,
   'title': ctx.rgb(0xff, 0xc6, 0x6d),
   'params': nocolor,
   'comment': ctx.rgb(0x80, 0x80, 0x80),
   'doctag': ctx.bold,
   'meta': ctx.rgb(0xbb, 0xb5, 0x29),
   'meta-keyword': nocolor,
   'meta-string': nocolor,
   'section': ctx.rgb(0xff, 0xc6, 0x6d),
   'tag': ctx.grey,
   'name': ctx.rgb(0xe8, 0xbf, 0x6a).bold,
   'builtin-name': nocolor,
   'attr': ctx.rgb(0xa9, 0xb7, 0xc6),
   'attribute': ctx.rgb(0x6A, 0x87, 0x59),
   'variable': ctx.rgb(0x62, 0x97, 0x55),
   'bullet': ctx.rgb(0x68, 0x97, 0xBB),
   'code': nocolor,
   'emphasis': ctx.italic,
   'strong': ctx.bold,
   'formula': nocolor,
   'link': ctx.rgb(0x62, 0x97, 0x55).underline,
   'quote': ctx.rgb(0x80, 0x80, 0x80),
   'selector-tag': ctx.rgb(0xcc, 0x78, 0x32),
   'selector-id': ctx.rgb(0xe8, 0xbf, 0x6a),
   'selector-class': ctx.rgb(0xe8, 0xbf, 0x6a),
   'selector-attr': nocolor,
   'selector-pseudo': nocolor,
   'template-tag': nocolor,
   'template-variable': ctx.rgb(0x62, 0x97, 0x55),
   'addition': ctx.rgb(0x6A, 0x87, 0x59),
   'deletion': ctx.rgb(0xcc, 0x78, 0x32),
   'default': nocolor,

   /**
    * 
    */
   'logLevels': {
      default: ctx.white,
      60: ctx.bgRed,
      50: ctx.red,
      40: ctx.yellow,
      30: ctx.green,
      20: ctx.blue,
      10: ctx.grey,
   },
  
   /**
    * 
    */
   'message': ctx.rgb(0x68, 0x97, 0xbb),

   /**
    * 
    */
   'greyMessage': ctx.rgb(0x80, 0x80, 0x80),

   /**
    * 
    */
   'time': ctx.rgb(0xbb, 0xb5, 0x29),
};
