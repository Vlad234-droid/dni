declare module '@hapi/bourne' {

   /**
    * Configuration object where:
    *  `protoAction` - optional string with one of: 
    *  `error` - throw a `SyntaxError` when a `__proto__` key is found. This is the default value.
    *  `remove` - deletes any `__proto__` keys from the input obj.
    */
   export type Options = { 
      protoAction?: 'error' | 'remove' | 'ignore';
   };
    
   /**
    * Parses a given JSON-formatted text into an object where:
    * @param text The JSON text string.
    * @param reviver A function that transforms the results. This function is called for each member of the object. 
    * If a member contains nested objects, the nested objects are transformed before the parent object is.
    * @param options Optional configuration object where:
    *  `protoAction` - optional string with one of: 
    *  `error` - throw a `SyntaxError` when a `__proto__` key is found. This is the default value.
    *  `remove` - deletes any `__proto__` keys from the input obj.
    * @returns Parsed object
    */
   export function parse(text: string, reviver?: (this: any, key: string, value: any) => any, options?: Options): any;
    
   /**
    * Scans a given object for prototype properties where:
    * @param obj The object being scanned.
    * @param options Optional configuration object where:
    *  `protoAction` - optional string with one of: 
    *  `error` - throw a `SyntaxError` when a `__proto__` key is found. This is the default value.
    *  `remove` - deletes any `__proto__` keys from the input obj.
    */
   export function scan(obj: any, options?: Options = {}): void;
    
   /**
    * Safely parse JSON string and ignores any error
    * @param text The JSON text string.
    * @param reviver A function that transforms the results. This function is called for each member of the object. 
    * If a member contains nested objects, the nested objects are transformed before the parent object is.
    * @returns Parsed object
    */
   export function safeParse (text: string, reviver?: (this: any, key: string, value: any) => any): any;

}

