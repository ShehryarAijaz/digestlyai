"use client"

import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'

const Schedule = ({ frequency, setFrequency }: { frequency: string, setFrequency: (frequency: string) => void }) => {

    const { data: session } = useSession()

  return (
    <>
    <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Choose Schedule</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Choose how often you want to receive your email digest</p>
        <div className="mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button type="submit" variant="outline">{frequency || "Set Frequency"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFrequency("Daily")}>Daily</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFrequency("Weekly")}>Weekly</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFrequency("Monthly")}>Monthly</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </>
  )
}

export default Schedule