class LoggerService {
  #colors = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m",
    gray: "\x1b[90m",
  };

  #getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  #formatLog(level, color, message, meta) {
    const timestamp = this.#getTimestamp();
    const prefix = `${this.#colors.gray}[${timestamp}]${
      this.#colors.reset
    } ${color}[${level}]${this.#colors.reset}`;
    let output = `${prefix} ${message}`;

    if (meta) {
      output += `\n  ${this.#colors.gray}└─${
        this.#colors.reset
      } ${JSON.stringify(meta, null, 2).split("\n").join("\n     ")}`;
    }

    return output;
  }

  info(message, meta = null) {
    console.log(this.#formatLog("INFO", this.#colors.cyan, message, meta));
  }

  success(message, meta = null) {
    console.log(this.#formatLog("SUCCESS", this.#colors.green, message, meta));
  }

  warn(message, meta = null) {
    console.warn(this.#formatLog("WARN", this.#colors.yellow, message, meta));
  }

  error(message, meta = null) {
    console.error(this.#formatLog("ERROR", this.#colors.red, message, meta));
  }
}

const loggerService = new LoggerService();

export default loggerService;
