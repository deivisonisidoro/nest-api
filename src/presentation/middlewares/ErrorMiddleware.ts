import { Injectable, NestMiddleware, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../../domain/utils/errors/HTTPError';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const errorHandler = (error) => {
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal Server Error';
      if (error instanceof HTTPError) {
        statusCode = error.statusCode;
        message = error.message;
      }

      res.status(statusCode).json({ message });
    }
    next();
    
  }
}
