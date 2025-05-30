export default class ApiError extends Error {
  status: number;
  code: number;
  details: Record<string, string> | string | null;
  title?: string;

  constructor(status: number, code: number, message: string, details: Record<string, string> | string | null, title?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.title = title;
    this.details = details;

    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  getStatus(): number {
    return this.status;
  }

  getCode(): number {
    return this.code;
  }

  getMessage(): string {
    return this.message;
  }

  getTitle() {
    return this.title;
  }
}
