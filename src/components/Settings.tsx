"use client"

import { Switch } from './ui/switch'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import React from 'react'

const Settings = (
  { topTweets, setTopTweets, aiSummaries, setAiSummaries, disabled = false }: 
  { topTweets: boolean, setTopTweets: (topTweets: boolean) => void, aiSummaries: boolean, setAiSummaries: (aiSummaries: boolean) => void, disabled?: boolean }) => {

  const handleSavePreferences = (topTweets: boolean) => {
    console.log("Saving preferences...", topTweets);
  }

  return (
    <>
    <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Settings & Personalization</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Customize your email digest</p>
        
        {disabled && (
          <div className="mt-5 p-4 bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/30">
            <p className="text-muted-foreground text-center font-medium">🚀 Coming Soon</p>
            <p className="text-sm text-muted-foreground text-center mt-1">Settings and personalization features are under development</p>
          </div>
        )}

        <div className={`flex items-center mt-5 gap-3 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="text-lg font-medium tracking-tight mb-0">Toggle AI-Powered Summaries</h3>
          <Switch 
            checked={aiSummaries} 
            onCheckedChange={disabled ? () => {} : setAiSummaries} 
            disabled={disabled}
          />
        </div>
        <div className={`flex items-center mt-1 gap-3 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <h3 className="text-lg font-medium tracking-tight mb-0">Include Top Tweets only vs Random Tweets</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" disabled={disabled}>{topTweets ? "Top Tweets" : "Random Tweets"}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTopTweets(true)} disabled={disabled}>Top Tweets</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTopTweets(false)} disabled={disabled}>Random Tweets</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className={`flex items-center mt-1 gap-3 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <Button
            variant="default"
            className="mt-3"
            onClick={() => handleSavePreferences(topTweets)}
            disabled={disabled}
          >
              Save Preferences
          </Button>
        </div>
      </div>
    </>
  )
}

export default Settings;