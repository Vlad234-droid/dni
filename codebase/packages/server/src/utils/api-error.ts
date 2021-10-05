export class ApiError extends Error {
  public readonly name = "ApiError";

  public static is(err: unknown): err is ApiError {
    return (
      (err as ApiError)?.name === "ApiError" &&
      (err as ApiError)?.reason != null &&
      (err as ApiError)?.status != null
    );
  }

  constructor(
    public readonly status: number,
    public readonly reason: string,
    public readonly details?: unknown,
  ) {
    super(`Api error: ${status} - ${reason}`);
  }
}
