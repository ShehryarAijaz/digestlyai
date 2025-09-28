import { z } from "zod";
import { devNewsSchema } from "@/schema/devNews.schema";

interface News {
    user: {
        username: string,
        github_username: string,
    }
    title: string,
    description: string,
    url: string,
    published_at: string
}

const devToNewsSchema = z.object({
    top: devNewsSchema.shape.top,
    per_page: devNewsSchema.shape.per_page
})


export async function GET(request: Request) {

    // https://dev.to/api/articles?top=7&per_page=10

    const { searchParams } = new URL(request.url)
    const queryParam = {
        top: searchParams.get("top"),
        per_page: searchParams.get("per_page")
    };

    const result = devToNewsSchema.safeParse(queryParam)

    if (!result.success) {
        return Response.json({
            success: false,
            message: result.error?.issues[0]?.message || "Invalid query parameters"
        },
        {
            status: 400
        })
    }

    const { top, per_page } = result.data;

    try {

        const devToUrl = `https://dev.to/api/articles?top=${top}&per_page=${per_page}`

        const response = await fetch(devToUrl, {
            headers: {
                Accept: 'application/vnd.forem.api-v1+json',
            }
        })
    
        if (!response.ok){
            return Response.json({
                success: false,
                message: "Failed to fetch trending dev news"
            },
            {
                status: 400
            })
        }
    
        const data = await response.json();
        
        const devNews = data.map((news: News) => ({
            username: news.user.username,
            github_username: news.user.github_username,
            title: news.title,
            description: news.description,
            url: news.url,
            published_at: news.published_at.split("T")[0],
        }));
    
        return Response.json({
            success: true,
            message: "Trending repositories fetched successfully!",
            data: devNews
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