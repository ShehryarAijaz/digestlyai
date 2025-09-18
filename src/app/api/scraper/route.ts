import dbConnect from "@/lib/dbConnect";
import { chromium } from "playwright";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/auth";
import UserModel from "@/app/models/user.model";

export async function GET(request: Request) {

    await dbConnect();

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        },
        {
            status: 401
        }
    )
    }

    const user = session.user as User
    const email = user.email

    const userDetails = await UserModel.findOne({ email: email })

    if (!userDetails) {
        return Response.json({
            success: false,
            message: "User not found"
        },
        {
            status: 404
        }
        )
    }

    const accounts = userDetails.socialHandles.accounts    

    if (accounts.length === 0) {
        return Response.json({
            success: false,
            message: "No accounts found"
        },
        {
            status: 404
        }
    )
    }

    const username = accounts[2]

    if (!username) {
        return Response.json(
            {
                success: false,
                message: "Username is required"
            },
            {
                status: 400
            }
        );
    }

    try {
        const browser = await chromium.connectOverCDP({
            endpointURL: `wss://production-sfo.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`,
        });

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(`https://x.com/${username}`);
        await page.waitForSelector("article");

        const tweets = await page.$$eval("article", (articles, username) => {
            return articles
                .map(article => {
                    // ❌ Skip pinned tweets
                    const socialContext = article.querySelector('div[data-testid="socialContext"]');
                    if (socialContext && socialContext.textContent?.includes("Pinned")) {
                        return null;
                    }
        
                    // Extract tweet text
                    const textNode = article.querySelector("div[lang]");
                    const text = textNode?.textContent?.trim() || "";
        
                    // Extract tweet URL
                    const anchor = article.querySelector(`a[href*="/status/"]`) as HTMLAnchorElement | null;
                    const url = anchor ? `https://x.com${anchor.getAttribute("href")}` : null;
        
                    // Extract timestamp
                    const time = article.querySelector("time") as HTMLTimeElement | null;
                    const timestamp = time ? time.getAttribute("datetime") : null;
        
                    // Detect retweets (if it says "Reposted" but not by the same user)
                    const header = article.querySelector("div[dir='ltr'] span")?.textContent || "";
                    const isRepost = header && header.toLowerCase().includes("reposted");
        
                    if (!text || !url || isRepost) {
                        return null;
                    }
        
                    return {
                        text,
                        url,
                        timestamp,
                        type: article.querySelector("div[data-testid='tweetText']") ? "tweet" : "quote"
                    };
                })
                .filter(Boolean)
                .slice(0, 3);
        }, username);
        

        await browser.close();

        return Response.json(
            {
                success: true,
                username,
                tweets
            },
            {
                status: 200
            }
        );
    } catch (error: any) {
        console.error("Scraper error:", error);

        return Response.json(
            {
                success: false,
                message: "Error scraping tweets",
                error: error.message
            },
            {
                status: 500
            }
        );
    }
}
