"use client"

import React, { useEffect, useRef } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { toast } from 'sonner'
import axios from 'axios'

const Schedule = ({ frequency, setFrequency }: { frequency: string, setFrequency: (frequency: string) => void }) => {
    const isInitialLoad = useRef(true)

    useEffect(() => {
      // Skip API call on initial load
      if (isInitialLoad.current) {
        isInitialLoad.current = false
        return
      }

      const updateFrequency = async () => {
        try {
          const response = await axios.post(`/api/frequency`, { frequency })
          if (response.data.success) {
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
        } catch {
          toast.error("Error updating frequency")
        } 
      }
      updateFrequency()
    }, [frequency])

  return (
    <>
    <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Choose Schedule</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Choose how often you want to receive your email digest</p>
        <div className="mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="cursor-pointer" type="submit" variant="outline">{frequency || "Set Frequency"}</Button>
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