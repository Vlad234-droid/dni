export const DATE_FORMAT: string = 'yyyy-mm-dd HH:MM:ss.l o';

export const ERROR_LIKE_KEYS: string[] = ['err', 'error'];

export const MESSAGE_KEY: string = 'msg';

export const LEVEL_KEY: string = 'level';

export const LEVEL_LABEL: string = 'levelLabel';

export const TIMESTAMP_KEY: string = 'time';

export const LEVELS: Record<'default' | number, string> = {
   default: 'USERLVL',
   60: 'FATAL',
   50: 'ERROR',
   40: 'WARN',
   30: 'INFO',
   20: 'DEBUG',
   10: 'TRACE',
};

export const LEVEL_NAMES: Record<string, number> = {
   fatal: 60,
   error: 50,
   warn: 40,
   info: 30,
   debug: 20,
   trace: 10
};

// Object keys that probably came from a logger like Pino or Bunyan.
export const LOGGER_KEYS: string[] = [
   'pid',
   'hostname',
   'name',
   'level',
   'time',
   'timestamp',
   'caller'
];
