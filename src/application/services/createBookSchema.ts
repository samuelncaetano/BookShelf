import { z } from "zod";

const CreateBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  volume: z.number().int().min(1).optional().nullable(),
  status: z
    .enum(["NOT_STARTED", "STARTED", "IN_PROGRESS", "COMPLETED", "ABANDONED"])
    .optional()
    .nullable(),
});

export { CreateBookSchema };
