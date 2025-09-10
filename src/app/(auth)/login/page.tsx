"use client"

import React from 'react'
import { signIn, useSession } from "next-auth/react";
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {

    const { data: session } = useSession();
    
    if (session) {
        redirect("/dashboard")
    }

  return (
    <div className="min-h-screen relative flex justify-center items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/background-auth.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-1 justify-center items-center px-4 sm:px-6">
        <h1 className="effect-font-styling text-[28px] sm:text-[32px] leading-[30px] sm:leading-[34px] tracking-[-0.045rem] text-gray-10 font-bold mt-6 font-display text-balance text-center">Log in to your account</h1>
        <span className="mt-1 text-sm sm:text-md text-gray-10 font-normal text-balance text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-gray-10 font-semibold hover:text-gray-700 transition-colors">Sign up.</Link>
        </span>
        <Button
          className="mt-2 flex items-center gap-2 cursor-pointer dark:hover:bg-black transition-colors duration-300 dark:hover:text-white w-full sm:w-auto px-6 py-3"
          onClick={() => signIn("google")}
        >
          <svg className="relative" fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_829_635)">
              <path d="M19.8094 12.1497C19.8094 11.4942 19.7562 11.0158 19.6411 10.5198H12.1558V13.4784H16.5495C16.4609 14.2137 15.9826 15.321 14.9195 16.0651L14.9046 16.1641L17.2714 17.9976L17.4353 18.0139C18.9412 16.6232 19.8094 14.5769 19.8094 12.1497Z" fill="currentColor"></path>
              <path d="M12.1557 19.945C14.3083 19.945 16.1153 19.2363 17.4353 18.0139L14.9195 16.065C14.2463 16.5345 13.3427 16.8623 12.1557 16.8623C10.0474 16.8623 8.25806 15.4716 7.6202 13.5493L7.5267 13.5573L5.06575 15.4618L5.03357 15.5513C6.34459 18.1556 9.03754 19.945 12.1557 19.945Z" fill="currentColor" fillOpacity="0.6"></path>
              <path d="M7.62023 13.5494C7.45193 13.0533 7.35453 12.5218 7.35453 11.9726C7.35453 11.4233 7.45193 10.8918 7.61138 10.3958L7.60692 10.2901L5.11514 8.35498L5.03361 8.39376C4.49327 9.47449 4.18323 10.6881 4.18323 11.9726C4.18323 13.257 4.49327 14.4706 5.03361 15.5513L7.62023 13.5494Z" fill="currentColor"></path>
              <path d="M12.1557 7.08269C13.6527 7.08269 14.6626 7.72934 15.2384 8.26974L17.4884 6.07286C16.1065 4.7884 14.3083 4 12.1557 4C9.03754 4 6.34459 5.78937 5.03357 8.39371L7.61134 10.3957C8.25806 8.47347 10.0474 7.08269 12.1557 7.08269Z" fill="currentColor" fillOpacity="0.6"></path>
            </g>
            <defs>
              <clipPath id="clip0_829_635">
                <rect fill="white" height="16" transform="translate(4 4)" width="16"></rect>
              </clipPath>
            </defs>
          </svg>
          Login with Google
        </Button>
      </div>
    </div>
  )
}
export default LoginPage;