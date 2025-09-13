"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const EmailPreview = () => {
  const { data: session } = useSession()

  return (
    <>
    <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Email Preview</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Here&apos;s a preview of what your email digest will look like</p>
        <div className="mt-4 max-w-lg rounded-lg shadow-lg border bg-white dark:bg-zinc-900 overflow-hidden">
          {/* Email Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50 dark:bg-zinc-800">
            <div className="flex items-center gap-3">
              <img
                src={session?.user?.image || "/avatar-placeholder.png"}
                alt="Sender"
                className="h-10 w-10 rounded-full border"
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {session?.user?.name || "Your Name"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {session?.user?.email || "you@email.com"}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          {/* Subject */}
          <div className="px-6 py-3 border-b">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              Your Daily Digest
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Here’s what’s new from your selected accounts
            </div>
          </div>
          {/* Email Body */}
          <div className="px-6 py-4 bg-white dark:bg-zinc-900">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-700"></span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Account 1
                </span>
              </div>
              <div className="ml-10 text-gray-700 dark:text-gray-300 text-sm">
                • New post: <span className="font-semibold">"How to boost productivity in 2024"</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-700"></span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Account 2
                </span>
              </div>
              <div className="ml-10 text-gray-700 dark:text-gray-300 text-sm">
                • New follower: <span className="font-semibold">Jane Doe</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block h-8 w-8 rounded-full bg-gray-200 dark:bg-zinc-700"></span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Account 3
                </span>
              </div>
              <div className="ml-10 text-gray-700 dark:text-gray-300 text-sm">
                • Mentioned you in a comment: <span className="italic">"Great insights, thanks for sharing!"</span>
              </div>
            </div>
          </div>
          {/* Email Footer */}
          <div className="px-6 py-3 border-t bg-gray-50 dark:bg-zinc-800 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <span>Sent by Email Digest</span>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Unsubscribe</a>
          </div>
        </div>
      </div>
      </>
  )
}

export default EmailPreview;