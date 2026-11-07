import { z } from "zod";

export function testSchema<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.infer<T> {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  throw result.error;
}
