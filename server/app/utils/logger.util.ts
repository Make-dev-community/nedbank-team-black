import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config();

const level = () => {
	const env = process.env.SERVER_MODE || 'development';
	return env === 'development' ? 'debug' : 'warn';
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white',
};

const enumerateErrorFormat = winston.format((info: any) => {
	if (info instanceof Error) {
		Object.assign(info, { message: info.stack });
	}
	return info;
});

const format = winston.format.combine(
	enumerateErrorFormat(),
	process.env.SERVER_MODE === 'development'
		? winston.format.colorize({ all: true })
		: winston.format.uncolorize(),
	winston.format.timestamp({
		format: 'YYYY-MM-DD hh:mm:ss.SSS A',
	}),
	winston.format.splat(),
  winston.format.printf(({timestamp, level, message}) => `[${timestamp}] ${level}: ${message}`),
);

const format1 = winston.format.combine(
	// Add the message timestamp with the preferred format
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	// Tell Winston that the logs must be colored
	winston.format.colorize({ all: true }),
	// Define the format of the message showing the timestamp, the level and the message
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`
	)
);

const transports = [
	new winston.transports.Console({
		stderrLevels: ['error'],
	}),
];

winston.addColors(colors);

const logger = winston.createLogger({
	level: level(),
	format: format,
	transports: transports,
});

export default logger;
