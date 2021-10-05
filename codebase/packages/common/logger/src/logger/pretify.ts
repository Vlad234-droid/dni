import { highlight } from 'cli-highlight';
import { AndroidStudioTheme } from './pretifier/themes';


/**
 * 
 * @param obj 
 * @returns 
 */
export const jsonHighlight = (obj: string | object): string => {
   if (typeof obj === "object") {
      const jsonString = JSON.stringify(obj, undefined, 3);
      const result = highlight(jsonString, { language: 'json', theme: AndroidStudioTheme });
      return result;
   } else {
      const result = highlight(obj, { language: 'json', theme: AndroidStudioTheme });
      return result;
   }
};
 
 