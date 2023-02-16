import pino from 'pino';

const dev = true;

let logLevel;

if (dev) {
  logLevel = 'debug';
} else {
  logLevel = 'warn';
}

const log = pino({
  name: 'walletGuard',
  level: logLevel,
  browser: {
    asObject: true,
  },
}).child({ name: 'walletGuard' });

export default log;
