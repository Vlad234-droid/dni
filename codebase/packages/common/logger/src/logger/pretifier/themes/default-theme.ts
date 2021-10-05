import chalk from 'chalk';
import { nocolor, HighlightTheme } from "./theme";

const ctx = new chalk.Instance({ 'level': 3 });

/**
 * 
 */
export const DefaultTheme: HighlightTheme = {

   'keyword': ctx.blue,
   'built_in': ctx.cyan,
   'type': ctx.cyan.dim,
   'literal': ctx.blue,
   'number': ctx.green,
   'regexp': ctx.red,
   'string': ctx.red,
   'subst': nocolor,
   'symbol': nocolor,
   'class': ctx.blue,
   'function': ctx.yellow,
   'title': nocolor,
   'params': nocolor,
   'comment': ctx.green,
   'doctag': ctx.green,
   'meta': ctx.grey,
   'meta-keyword': nocolor,
   'meta-string': nocolor,
   'section': nocolor,
   'tag': ctx.grey,
   'name': ctx.blue,
   'builtin-name': nocolor,
   'attr': ctx.cyan,
   'attribute': nocolor,
   'variable': nocolor,
   'bullet': nocolor,
   'code': nocolor,
   'emphasis': ctx.italic,
   'strong': ctx.bold,
   'formula': nocolor,
   'link': ctx.underline,
   'quote': nocolor,
   'selector-tag': nocolor,
   'selector-id': nocolor,
   'selector-class': nocolor,
   'selector-attr': nocolor,
   'selector-pseudo': nocolor,
   'template-tag': nocolor,
   'template-variable': nocolor,
   'addition': ctx.green,
   'deletion': ctx.red,
   'default': nocolor,
   
   /**
    * 
    */
   'logLevels': {
      'default': ctx.white,
      '60': ctx.bgRed,
      '50': ctx.red,
      '40': ctx.yellow,
      '30': ctx.green,
      '20': ctx.blue,
      '10': ctx.grey,
   },
  
   /**
    * 
    */
   'message': ctx.cyan,

   /**
    * 
    */
   'greyMessage': ctx.grey,

   /**
    * 
    */
   'time': ctx.grey,
}