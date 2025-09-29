import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
import Image from "next/image"

const reviews = [
  {
    name: "Alex",
    username: "@alexdev",
    body: "The newsletter keeps me up-to-date with the latest developer news. Highly recommended!",
    img: "/jack.png",
  },
  {
    name: "Priya",
    username: "@priyacodes",
    body: "I love how concise and relevant the updates are. No spam, just pure value.",
    img: "/jill.png",
  },
  {
    name: "Sam",
    username: "@samueltech",
    body: "A must-have for any developer who wants to stay ahead in the community.",
    img: "/john.png",
  },
  {
    name: "Maria",
    username: "@maria_dev",
    body: "The best way to discover new tools and trends in the dev world. Delivered right to my inbox!",
    img: "/jane.png",
  },
  {
    name: "Liam",
    username: "@liamjs",
    body: "I appreciate the curated content and the focus on quality over quantity.",
    img: "/jenny.png",
  },
  {
    name: "Sophie",
    username: "@sophiedev",
    body: "Finally, a newsletter that actually helps me grow as a developer. Thank you!",
    img: "/james.png",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function MarqueeSlider({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex w-full flex-col items-center justify-center overflow-hidden", className)}>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
