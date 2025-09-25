import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import axios, { AxiosError } from "axios";
import { env } from '@/lib/env';

interface Repo {
    name: string;
    url: string;
    stars: number;
    description: string;
}

interface News {
    title: string;
    description: string;
    url: string;
    username: string;
    github_username: string;
    published_at: string;
}

export async function GET(){

    try {
        const [repos, news] = await Promise.all([
            axios.get(`${env.NEXT_PUBLIC_API_URL}/trending-repos?pushed=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}&sort=stars&order=desc&per_page=10`),
            axios.get(`${env.NEXT_PUBLIC_API_URL}/dev-news?top=7&per_page=10`)
        ])

        const reposData = repos?.data?.data ?? [];
        const newsData = news?.data?.data ?? [];

        const reposText = reposData
        .map((repo: Repo) => `Name: ${repo.name}\nStars: ${repo.stars}\nDescription: ${repo.description}\nURL: ${repo.url}`)
        .join("\n");

        const newsText = newsData
        .map((article: News) => `Title:${article.title}\nDescription: ${article.description}\nAuthor: ${article.username} ${article.github_username}\nURL: ${article.url}\nPublished At: ${article.published_at}`)
        .join("\n");

        // console.log("Repos Data: ", reposData)
        // console.log("News Data: ", newsData)

        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
            prompt: `You are helping generate content for a developer-focused newsletter. You will be given two arrays of JSON data:

            Repos Data → contains trending GitHub repositories (fields: name, url, stars, description).

            News Data → contains trending developer news (fields: title, description, url, username, published_at).

            Your task:

            Write one engaging paragraph per item.

            For Repos, include the repository name (with Markdown link), star count, and a short summary of what it offers or why it matters.

            For News, include the article title (with Markdown link), author's username, a 1–2 sentence summary, and the publish date in parentheses.

            Keep each summary concise (2–3 sentences), friendly, and informative — suitable for inclusion in a newsletter email.

            Do not repeat the raw description text verbatim; instead, rephrase naturally for readers.

            Output format:

            Start with a section heading ### 🔥 Trending Repositories, followed by numbered summaries of repos.

            Then a section heading ### 📰 Latest Developer News, followed by numbered summaries of news items.

            Here is the input data:

            Repos Data: ${reposText}
            News Data: ${newsText}`,
        });
        
        return Response.json({
            success: true,
            message: "response sent successfully",
            summary: text
        },
        {
            status: 200
        })
    } catch (error) {
        return Response.json({
            success: false,
            message: "Failed to summarize repositories and news",
            error: error
        },
        {
            status: 500
        })

    }
}