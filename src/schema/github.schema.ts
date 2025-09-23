import z, { date } from "zod";

export const githubSchema = z.object({
    pushed: z.string().refine(
        (date) => {
            const inputDate = new Date(date);
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return inputDate >= sevenDaysAgo && inputDate <= new Date();
        },
        { message: "push date must be within the last 7 days" }
    ),
    sort: z.enum(["stars", "fork", "updated"]).default("stars"),
    order: z.enum(["asc", "desc"]).default("desc"),
    per_page: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0 && val <= 100, {
        message: "per_page must be between 1 and 100"
    }).default(10),
})