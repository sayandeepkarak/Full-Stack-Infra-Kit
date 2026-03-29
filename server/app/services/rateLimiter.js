import rateLimit from "express-rate-limit";
import StatusService from "./status.js";
import { Router } from "express";
import loggerService from "./logger.service.js";

class RateLimiter {
  #router;
  #dailyLimit;
  #shortLimit;
  #shortLimitDuration;

  constructor(
    router,
    {
      dailyLimit = 500,
      shortLimit = 100,
      shortLimitDuration = 15 * 60 * 1000,
    } = {},
  ) {
    this.#router = router;
    this.#dailyLimit = dailyLimit;
    this.#shortLimit = shortLimit;
    this.#shortLimitDuration = shortLimitDuration;
  }

  #getDailyLimiter() {
    return rateLimit({
      windowMs: 24 * 60 * 60 * 1000,
      max: this.#dailyLimit,
      standardHeaders: true,
      legacyHeaders: false,
      message: StatusService.TOO_MANY_REQUESTS(
        "Daily limit reached. Try again tomorrow.",
      ),
    });
  }

  #getShortLimiter() {
    return rateLimit({
      windowMs: this.#shortLimitDuration,
      max: this.#shortLimit,
      standardHeaders: true,
      legacyHeaders: false,
      message: StatusService.TOO_MANY_REQUESTS(
        `Too many requests. Try again in ${this.#shortLimitDuration / 60000} minutes.`,
      ),
    });
  }

  applyLimiter() {
    if (this.#router instanceof Router) {
      this.#router.use(this.#getShortLimiter(), this.#getDailyLimiter());
    } else {
      loggerService.error(
        "Failed to activate rateLimiter, got invalid router instance",
      );
    }
  }
}

export default RateLimiter;
