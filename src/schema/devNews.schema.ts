import z from "zod";

export const devNewsSchema = z.object({
    top: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => [1, 7, 30].includes(val), {
        message: "top must be 1, 7, or 30"
    })
    .default(7),

    per_page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 10, {
        message: "per_page must be between 1 and 10"
    })
    .default(10),
})