import clr from "ansi-colors";

type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Log message object containing level, message, and timestamp.
 */
type LogMessage = {
	level: LogLevel;
	message: string;
	timestamp: string;
};

function logger(message: string, level: LogLevel = "info") {
	const logMessage: LogMessage = {
		level,
		message,
		timestamp: new Date().toISOString(),
	};

	switch (level) {
		case "debug":
			console.log(clr.blue(logMessage.timestamp), logMessage.message);
			break;
		case "info":
			console.log(clr.green(logMessage.timestamp), logMessage.message);
			break;
		case "warn":
			console.log(clr.yellow(logMessage.timestamp), logMessage.message);
			break;
		case "error":
			console.log(clr.red(logMessage.timestamp), logMessage.message);
			break;
		default:
			console.log(logMessage.message);
	}
}

export { logger };
