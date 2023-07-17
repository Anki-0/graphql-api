import {
  format,
  Logger as WinstonLogger,
  transports,
  addColors,
  createLogger
} from 'winston';
import { __DEV__ } from './assertions.js';
const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
  }
};

const prodFormatter = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ''
    }`;
  })
);

const devFormatter = format.combine(
  format.json(),
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.splat(),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;

    return `[⌚] [${timestamp}] [${level}]: ${message} ${
      Object.keys(meta).length
        ? JSON.stringify(
            meta,
            (key, value) => {
              if (key === 'stacktrace') {
                return undefined;
              }
              return value;
            },
            2
          )
        : ''
    }`;
  })
);

const formatter = __DEV__ ? devFormatter : prodFormatter;

class Logger {
  #logger: WinstonLogger;

  constructor() {
    const prodTransport = new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: formatter
    });
    const transport = new transports.Console({
      format: formatter
    });
    this.#logger = createLogger({
      level: __DEV__ ? 'trace' : 'error',
      levels: customLevels.levels,
      transports: [__DEV__ ? transport : prodTransport]
    });
    addColors(customLevels.colors);
  }

  trace(msg: any, meta?: any) {
    this.#logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.#logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.#logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.#logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.#logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.#logger.log('fatal', msg, meta);
  }
}

export const logger = new Logger();
