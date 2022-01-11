import { isNullOrUndefined } from 'util';
import { DniEntityTypeEnum } from './enums';

class CcmsEntityKey {
  entityId!: number;
  entityType!: DniEntityTypeEnum;

  constructor(entityId: number, entityType: DniEntityTypeEnum) {
    if (typeof entityId !== "number" || entityId < 0) {
      throw new TypeError("invalid entityId, value must be greater than zero");
    }
    if (!Object.values(DniEntityTypeEnum).includes(entityType)) {
      throw new TypeError(`invalid entityType (unknown value [${entityType}])`);
    }

    this.entityType = entityType as DniEntityTypeEnum;
    this.entityId = entityId;
  }
}

// Parse a stringified record literal
function fromPostgresCompositeType(compositeValue: string): CcmsEntityKey | undefined {
  if (compositeValue === null || compositeValue === undefined) {
    return undefined;
  }

  if (typeof compositeValue !== 'string') { 
    throw new TypeError(`composite type didn't return as string`); 
  }

  return parse(
    compositeValue, 
    parsedArrayToCcmsEntityKey, 
    'singe',
    ) as CcmsEntityKey | undefined;
}

// Note: `type` on the @Column must be set to 'text'
// convert a CcmsEntityKey into a stringified record literal
function toPostgresCompositeType(compositeObject: CcmsEntityKey): string | undefined {
  if (compositeObject === null || compositeObject === undefined
    || compositeObject.entityId  === null || compositeObject.entityId === undefined
    || compositeObject.entityType  === null || compositeObject.entityType === undefined) {
    return undefined;
  }

  if (!compositeObject) { 
    throw new TypeError(`invalid CcmsEntityKey object`); 
  }

  if (typeof compositeObject.entityId !== "number" || compositeObject.entityId < 0) {
    throw new TypeError("invalid CcmsEntityKey object, entityId value must be greater than zero");
  }

  if (!Object.values(DniEntityTypeEnum).includes(compositeObject.entityType)) {
    throw new TypeError(`invalid CcmsEntityKey object, entityType (unknown value [${compositeObject.entityType}])`);
  }

  return `(${compositeObject.entityId},${compositeObject.entityType})`;
}

// Parse a stringified record literal
function fromPostgresCompositeTypeArray(compositeValue: string): CcmsEntityKey[] | undefined {
  if (compositeValue === null || compositeValue === undefined) {
    return undefined;
  }

  if (typeof compositeValue !== 'string') { 
    throw new TypeError(`composite type didn't return as string`); 
  }

  return parse(
    compositeValue, 
    parsedArrayToCcmsEntityKey, 
    'array',
    ) as CcmsEntityKey[] | undefined;
}

// Note: `type` on the @Column must be set to 'text'
// convert a CcmsEntityKey into a stringified record literal
function toPostgresCompositeTypeArray(compositeObjectArray: CcmsEntityKey[]): string | undefined {
  if (compositeObjectArray === null || compositeObjectArray === undefined) {
    return undefined;
  }

  if (Array.isArray(compositeObjectArray)) { 
    if (compositeObjectArray.length > 0) {
      const result = compositeObjectArray.map(compositeObject => `"${toPostgresCompositeType(compositeObject)}"`);
      return `{${result.join(',')}}`
    } else {
      return '{}';
    }
  } else {
    return undefined;
  }

  //return `(${compositeObject.entityId},${compositeObject.entityType})`;
}

function parsedArrayToCcmsEntityKey(arr: string[]): CcmsEntityKey {
  const [ entityIdStr, entityType ] = arr;

  const entityId = parseInt(entityIdStr, 10);
  if (typeof entityId !== 'number' || isNaN(entityId) || entityId < 0) {
    throw new TypeError(`invalid entityId in record literal: [${entityIdStr}]`);
  }

  if (!Object.values(DniEntityTypeEnum).includes(entityType as DniEntityTypeEnum)) {
    throw new TypeError(`invalid entityType in record literal: [${entityType}]`);
  }

  return new CcmsEntityKey(entityId, entityType as DniEntityTypeEnum);
}

/**
 * 
 * @param value 
 * @param fnArrToType 
 * @param mode 
 * @returns 
 */
function parse<T>(
  value: string, 
  fnArrToType: (r: string[]) => T, 
  mode: 'singe' | 'array' = 'singe'): T | T[] | undefined {

  const ARR_START_TOKEN = '{';
  const ARR_END_TOKEN = '}';
  const OBJ_START_TOKEN = '(';
  const OBJ_END_TOKEN = ')';
  const QUOTE_TOKEN = '"';
  const COMMA_TOKEN = ',';
  const SPACE_TOKEN = ' ';
  const LITEARAL_REGEX = /[a-zA-Z0-9_\.]/;

  const parseCompositeTypeArray = (currentPos: number) => {
    const resultsArray = [];

    let currectState: 'initial' | 'parseStart' | 'parsing' | 'parseEnd' | 'parseNext' = 'initial';
    while (currentPos < value.length) {
      currentPos++;
      const currentChar = value.charAt(currentPos-1);

      if (currectState === 'initial') {
        if (currentChar === SPACE_TOKEN) {
          continue;
        } else if (currentChar === ARR_START_TOKEN) {
          currectState = 'parseStart';
          continue;
        } else {
          throw new TypeError(`Invalid literal. ` +
            `Unexpected char at position ${currentPos}. ` + 
            `Expected '${ARR_START_TOKEN}', but got: '${currentChar}'`);
        }
      } else if (currectState === 'parseStart') {
        if (currentChar === SPACE_TOKEN) {
          continue;
        } else if (currentChar === QUOTE_TOKEN) {
          currectState = 'parsing';
          continue;
        } else if (currentChar === ARR_END_TOKEN && resultsArray.length === 0) {
          return resultsArray;
        } else {
          throw new TypeError(`Invalid literal. ` +
            `Unexpected char at position ${currentPos}. ` + 
            `Expected '${QUOTE_TOKEN}', but got: '${currentChar}'`);
        }
      } else if (currectState === 'parsing') {
        const parseResult = parseCompositeType(currentPos - 1);
        resultsArray.push(fnArrToType(parseResult.literals));
        currentPos = parseResult.currentPos;
        currectState = 'parseEnd';
      } else if (currectState === 'parseEnd') {
        if (currentChar === SPACE_TOKEN) {
          continue;
        } else if (currentChar === QUOTE_TOKEN) {
          currectState = 'parseNext';
          continue;
        } else {
          throw new TypeError(`Invalid literal. ` +
            `Unexpected char at position ${currentPos}. ` + 
            `Expected '${QUOTE_TOKEN}', but got: '${currentChar}'`);
        }
      } else if (currectState === 'parseNext') {
        if (currentChar === SPACE_TOKEN) {
          continue;
        } else if (currentChar === ARR_END_TOKEN) {
          return resultsArray;
        } else if (currentChar === COMMA_TOKEN) {
          currectState = 'parseStart';
          continue;
        } else {
          throw new TypeError(`Invalid literal. ` +
            `Unexpected char at position ${currentPos}. ` + 
            `Expected '${COMMA_TOKEN}' or '${ARR_END_TOKEN}', but got: '${currentChar}'`);
        }
      } 
    }

    throw new TypeError(`Invalid literal. Unexpected EOL`);
  }

  const parseCompositeType = (currentPos: number) => {
    const literals = [];

    let currentValue = '';
    let currectState: 'initial' | 'parse' = 'initial';
    while (currentPos < value.length) {
      currentPos++;
      const currentChar = value.charAt(currentPos-1);

      if (currectState === 'initial') {
        if (currentChar === SPACE_TOKEN) {
          continue;
        } else if (currentChar === OBJ_START_TOKEN) {
          currectState = 'parse';
          continue;
        } else {
          throw new TypeError(`Invalid literal. ` +
            `Unexpected char at position ${currentPos}. ` + 
            `Expected '${OBJ_START_TOKEN}', but got: '${currentChar}'`);
        }
      } else if (currectState === 'parse') {
        if (currentChar === OBJ_END_TOKEN) {
          literals.push(currentValue);
          return {
            currentPos: currentPos,
            literals
          }
        } else if (currentChar === COMMA_TOKEN) {
          literals.push(currentValue);
          currentValue = '';
        } else if (currentChar === SPACE_TOKEN) { 
          continue;
        } else if (LITEARAL_REGEX.test(currentChar)) {
          currentValue += currentChar;
        } else {
          throw new TypeError(`Invalid literal. ` +
            `Unexpected char at position ${currentPos}: '${currentChar}'`);
        }
      }
    }

    throw new TypeError(`Invalid literal. Unexpected EOL`);
  }

  if (!!value && value.length > 0) {
    if (mode === 'singe') {
      const parseResult = parseCompositeType(0);
      return fnArrToType(parseResult.literals);
    } else if (mode === 'array') {
      return parseCompositeTypeArray(0);
    } else {
      throw new TypeError(`Invalid parse mode ${mode}`);
    }
  } else {
    return undefined;
  }
}

export { CcmsEntityKey };

export { fromPostgresCompositeType, toPostgresCompositeType };
export { fromPostgresCompositeTypeArray, toPostgresCompositeTypeArray };
