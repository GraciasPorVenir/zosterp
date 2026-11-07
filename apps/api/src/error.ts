export default class HttpError extends Error {
  public code: number;
  public data: unknown;

  constructor(code: number = 500, error: string = "Error del servidor") {
    super();
    this.code = code;
    this.data = error;
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "HttpError";
  }
}
