export type Result<T, C extends string> = C extends any ? _Result<T, C> : never;

export class Failure<CT> extends Error {
  type: CT;

  constructor(params: { message: string; type: CT }) {
    super(params.message);
    this.type = params.type;
  }

  /**
   * Create a Failure from an existing Error. This is useful when underlying code
   * provides an Error you want to convert into a Failure.
   * This process shallow copies the Error into a Failure.
   */
  static from<ECT>(params: { error: Error; type: ECT }): Failure<ECT> {
    // Create new failure for our error to be copyed into.
    const failure = new Failure<ECT>({
      message: params.error.message,
      type: params.type,
    });

    // Merge error properties onto our custom error.
    Object.defineProperties(
      failure,
      Object.getOwnPropertyDescriptors(params.error),
    );

    return failure;
  }
}

export type _Result<T, C extends string> = T | Failure<C>;
