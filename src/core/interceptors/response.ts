import { IResponse } from './IResponse';

export class ResponseResult<ResponseEntity> {
  public statusCode?: number;
  public message?: string;
  public data?: ResponseEntity | ResponseEntity[];

  /**
   * Constructs a response result object with the given data, message, and status code.
   *
   * @param responseResults - The response results.
   */
  constructor(responseResults: IResponse<ResponseEntity>) {
    this.statusCode = responseResults.statusCode;
    this.message = responseResults.message;
    this.data = responseResults.data;
  }
}
