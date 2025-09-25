"use client"

import { RainbowButton } from '@/components/ui/rainbow-button';
import { useSession } from 'next-auth/react';
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri';
import Link from 'next/link';
import { MarqueeSlider } from '@/components/MarqueeSlider';
import { Globe } from "@/components/ui/globe"

const HomePage = () => {

  const { data: session } = useSession();

  return (
    <>
      <main className="h-[60vh] max-sm:h-[42vh] max-w-4xl mx-auto flex justify-center">
        <div className="flex flex-col justify-center items-center max-w-4xl gap-2">
          <h1 className="scroll-m-20 text-center text-6xl font-extrabold tracking-tight text-
          balance">Get the latest news and updates from the developer community.</h1>
          <p className="text-muted-foreground mt-1 text-xl">Straight to your inbox. No spam.</p>
          <Link href={`${session ? '/dashboard' : '/login'}`}>
            <RainbowButton className="w-auto space-x-3">
                <span>Get Started</span>
                <span><RiArrowRightSLine /></span>
            </RainbowButton>
          </Link>
        </div>
      </main>
      <div>
        <MarqueeSlider />
      </div>
      <div>
        {/* <Globe /> */}
      </div>
    </>
  )
}

export default HomePage;