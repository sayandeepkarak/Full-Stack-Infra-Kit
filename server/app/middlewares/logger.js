import morgan from "morgan";

morgan.token("status-colored", (req, res) => {
  const status = res.statusCode;
  const color =
    status >= 500
      ? "\x1b[31m" // Red
      : status >= 400
      ? "\x1b[33m" // Yellow
      : status >= 300
      ? "\x1b[36m" // Cyan
      : status >= 200
      ? "\x1b[32m" // Green
      : "\x1b[0m"; // No color

  return `${color}${status}\x1b[0m`;
});

const format =
  ":method :url :status-colored :response-time ms - :res[content-length]";

const logger = morgan(format);

export default logger;
