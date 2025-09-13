"use client"

import { Switch } from './ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import React from 'react'

const TopTweets = ({ topTweets, setTopTweets }: { topTweets: boolean, setTopTweets: (topTweets: boolean) => void }) => {

  const handleSavePreferences = (topTweets: boolean) => {
    console.log("Saving preferences...", topTweets);
  }

  return (
    <>
    <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Settings & Personalization</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Customize your email digest</p>
        <div className="flex items-center mt-5 gap-3">
          <h3 className="text-lg font-medium tracking-tight mb-0">Toggle AI-Powered Summaries</h3>
          <Switch />
        </div>
        <div className="flex items-center mt-1 gap-3">
          <h3 className="text-lg font-medium tracking-tight mb-0">Include Top Tweets only vs Random Tweets</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{topTweets ? "Top Tweets" : "Random Tweets"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTopTweets(true)}>Top Tweets</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTopTweets(false)}>Random Tweets</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center mt-1 gap-3">
          <Button
            variant="default"
            className="mt-3"
            onClick={() => handleSavePreferences(topTweets)}  
          >
              Save Preferences
          </Button>
        </div>
      </div>
    </>
  )
}

export default TopTweets