import { z } from "zod";

class ZodValidator {
  #schema;
  constructor(schema) {
    this.#schema = z.object(schema);
  }

  validate(data) {
    const result = this.#schema.safeParse(data);
    if (!result.success) {
      return {
        status: false,
        error: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          error: issue.message,
        })),
      };
    }
    return {
      status: true,
      data: result.data,
    };
  }
}

export default ZodValidator;
