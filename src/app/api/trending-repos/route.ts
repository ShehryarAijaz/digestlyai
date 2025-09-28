import { z } from "zod";
import { githubSchema } from "@/schema/github.schema";

interface Repo {
    full_name: string;
    html_url: string;
    stargazers_count: number;
    description: string;
}

const trendingRepoSchema = z.object({
    pushed: githubSchema.shape.pushed,
    sort: githubSchema.shape.sort,
    order: githubSchema.shape.order,
    per_page: githubSchema.shape.per_page
})

export async function GET(request: Request) {

    // https://api.github.com/search/repositories?q=created:>2025-09-16&sort=stars&order=desc&per_page=10

    const { searchParams } = new URL(request.url)
    const queryParam = {
        pushed: searchParams.get("pushed"),
        sort: searchParams.get("sort"),
        order: searchParams.get("order"),
        per_page: searchParams.get("per_page")
    };

    const result = trendingRepoSchema.safeParse(queryParam)

    if (!result.success) {
        return Response.json({
            success: false,
            message: result.error?.issues[0]?.message || "Invalid query parameters"
        },
        {
            status: 400
        })
    }

    const { pushed, sort, order, per_page } = result.data;

    try {

        const githubUrl = `https://api.github.com/search/repositories?q=pushed:>${pushed}+stars:>1&sort=${sort}&order=${order}&per_page=${per_page}`

        const response = await fetch(githubUrl, {
            headers: {
                Accept: 'application/vnd.github+json',
                // Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }
        })
    
        if (!response.ok){
            return Response.json({
                success: false,
                message: "Failed to fetch trending repositories"
            },
            {
                status: 400
            })
        }
    
        const data = await response.json();
        
        const repos = data.items.map((repo: Repo) => ({
            name: repo.full_name,
            url: repo.html_url,
            stars: repo.stargazers_count,
            description: repo.description,
        }));
    
        return Response.json({
            success: true,
            message: "Trending repositories fetched successfully!",
            data: repos
        })

    } catch {
        return Response.json(
        {
            success: false,
            message: "Failed to fetch repositories",
        },
        {
            status: 500,
        });
    } 
}