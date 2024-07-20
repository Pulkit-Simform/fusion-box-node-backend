export interface IResponse<ResponseEntity> {
  statusCode?: number;
  message?: string;
  data?: ResponseEntity | ResponseEntity[];
}
