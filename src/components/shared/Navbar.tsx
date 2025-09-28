'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { ThemeModeToggle } from '@/components/shared/ThemeModeToggle'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from 'next/image'

function BWMark() {
  return (
    <div className="flex items-center gap-2 select-none text-black dark:text-white">
      <svg width="22" height="22" viewBox="0 0 64 64" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="10" y="10" width="44" height="44" rx="10" opacity="0.8" />
          <circle cx="32" cy="32" r="12" opacity="0.8" />
          <path d="M16 40c6-2 10-12 16-12s10 10 16 12" opacity="0.8" />
        </g>
      </svg>
      <span className="text-base font-semibold tracking-tight">Email Digest</span>
    </div>
  )
}

const Navbar = () => {

    const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/70 dark:bg-black/50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50">
      <div className='flex justify-between items-center max-w-7xl mx-auto px-6 py-3'>
        <Link href="/" className='hover:opacity-80 transition'><BWMark /></Link>
        {session ? (
          <div className="flex items-center gap-3">  
            <Popover>
              <PopoverTrigger asChild>
                <Image src={session?.user?.image as string} alt="User" className='h-8 w-8 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300' />
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="p-2 flex flex-col">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-sm text-gray-500 mb-3">{session?.user?.email}</p>

                  <Button 
                    onClick={() => signOut({ callbackUrl: '/login' })} 
                    className='bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300'
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <ThemeModeToggle />
          </div>
        ) : (
          <div className='flex gap-2 items-center'>
            <Button asChild variant='ghost' className='hover:bg-black/5 dark:hover:bg-white/10'><Link href="/login">Login</Link></Button>
                <Button asChild className='bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90'><Link href="/signup">Get Started</Link></Button>
            <ThemeModeToggle />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar