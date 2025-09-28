import z from "zod";

export const githubSchema = z.object({
    pushed: z.string().refine(
        (date) => {
            const inputDate = new Date(date + 'T00:00:00.000Z'); // Ensure UTC timezone
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const today = new Date();
            
            // Reset time to start of day for accurate comparison
            sevenDaysAgo.setHours(0, 0, 0, 0);
            today.setHours(23, 59, 59, 999);
            
            return inputDate >= sevenDaysAgo && inputDate <= today;
        },
        { message: "push date must be within the last 7 days" }
    ).default(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]),
    sort: z.enum(["stars", "fork", "updated"]).default("stars"),
    order: z.enum(["asc", "desc"]).default("desc"),
    per_page: z.string().transform((val) => parseInt(val, 10)).refine((val) => val > 0 && val <= 100, {
        message: "per_page must be between 1 and 100"
    }).default(10),
})