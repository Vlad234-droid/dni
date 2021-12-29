import { JSON } from "@energon/type-utils";

export const convertErrorToPlainObject = (error: Error): JSON => {
  const errorObject = Object.getOwnPropertyNames(error).reduce(
    (result: any, prop: string) => {
      if (prop === "message") {
        result["errorMessage"] = (error as any)[prop];
      } else if (prop === "name") {
        result["errorType"] = (error as any)[prop];
      } else {
        result[prop] = (error as any)[prop];
      }
      return result;
    },
    {
      errorType: error.constructor.name,
    },
  );

  try {
    JSON.stringify(errorObject);
    return errorObject;
  } catch (stringifyError) {
    const { errorMessage, errorType, stack } = errorObject;
    return {
      errorMessage,
      errorType,
      stack,
      serializationError: `Couldn't serialize error object: ${(stringifyError as Error).message}`,
    };
  }
};
