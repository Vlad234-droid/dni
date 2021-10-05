import Express from "express";

export interface AsyncHandler {
  (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> | void;
};

/**
 * Create async *Express.Handler* function, which always forwards exceptions to the next function.
 * The wrapped handler can safely use *async* *await* and throw exceptions, without the risk of
 * unhandled promise rejection error
 */
export const asyncHandler = (
  handler: AsyncHandler,
): Express.Handler => async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

// export type AsyncHandler = ReturnType<typeof asyncHandler>;