export class TransformSqlExceptionData {
  message: string;
  code: string;
  errno: number;
  sqlState: string;
  name: string;
  exception: any;

  constructor(exception) {
    this.exception = exception;
    this.message = exception.message;
    this.code = exception.response.code;
    this.errno = exception.response.errno;
    this.sqlState = exception.response.sqlState;
    this.name = exception.response.name;
  }

  getTransform() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      errno: this.errno,
      sqlState: this.sqlState,
    };
  }

  getException() {
    return this.exception;
  }
}
