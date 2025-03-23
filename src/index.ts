export type Result<T, C extends string> = C extends any ? _Result<T,C> : never

export class Failure<CT> extends Error {
  type: CT

  constructor(params: {
    message: string
    type: CT
  }) {
    super(params.message);
    this.type = params.type;
  }
}

export type _Result<T, C extends string> = T | Failure<C>
