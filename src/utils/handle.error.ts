import { HttpException, InternalServerErrorException } from '@nestjs/common';

export function handleError(error: any) {
  if (error instanceof HttpException) {
    throw new HttpException(
      { statusCode: error.getStatus(), message: error.message },
      error.getStatus(),
    );
  } else if (error.errorResponse) {
    throw new HttpException(
      error.errorResponse.message,
      error.errorResponse.statusCode,
    );
  } else {
    throw new InternalServerErrorException(error);
  }
}
