"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
dotenv_1.default.config();
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
const enumerateErrorFormat = winston_1.default.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
const format = winston_1.default.format.combine(enumerateErrorFormat(), process.env.SERVER_MODE === 'development'
    ? winston_1.default.format.colorize({ all: true })
    : winston_1.default.format.uncolorize(), winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
}), winston_1.default.format.splat(), winston_1.default.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`));
const format1 = winston_1.default.format.combine(
// Add the message timestamp with the preferred format
winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }), 
// Tell Winston that the logs must be colored
winston_1.default.format.colorize({ all: true }), 
// Define the format of the message showing the timestamp, the level and the message
winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    new winston_1.default.transports.Console({
        stderrLevels: ['error'],
    }),
];
winston_1.default.addColors(colors);
const logger = winston_1.default.createLogger({
    level: level(),
    format: format,
    transports: transports,
});
exports.default = logger;
