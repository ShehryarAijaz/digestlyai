"use client"

import { RainbowButton } from '@/components/ui/rainbow-button';
import { useSession } from 'next-auth/react';
import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri';
import Link from 'next/link';
import { MarqueeSlider } from '@/components/MarqueeSlider';

const HomePage = () => {

  const { data: session } = useSession();

  return (
    <>
      <main className="w-full px-4 mx-auto flex justify-center items-center min-h-[40vh] h-[60vh] max-w-4xl max-md:h-[50vh] max-md:max-w-3xl max-sm:h-[42vh] max-sm:max-w-xl">
        <div className="flex flex-col justify-center items-center w-full max-w-4xl gap-4 sm:gap-3 max-sm:gap-2">
          <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-balance
            text-4xl sm:text-5xl md:text-6xl max-sm:text-2xl
          ">
            Get the latest news and updates from the developer community.
          </h1>
          <p className="text-muted-foreground mt-2 text-base sm:text-lg md:text-xl text-center">
            Straight to your inbox. No spam.
          </p>
          <Link href={`${session ? '/dashboard' : '/login'}`} className="w-full flex justify-center">
            <RainbowButton className="w-full sm:w-auto space-x-3 flex items-center justify-center">
              <span>Get Started</span>
              <span><RiArrowRightSLine /></span>
            </RainbowButton>
          </Link>
        </div>
      </main>
      <div>
        <MarqueeSlider />
      </div>
    </>
  )
}

export default HomePage;