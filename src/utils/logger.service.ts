import * as winston from 'winston';
const { combine, timestamp, json } = winston.format;

/**
 * It creates a logger used for information & error tracking
 */
export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  exitOnError: false,
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
});
