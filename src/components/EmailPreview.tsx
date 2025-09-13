"use client"

import { useSession } from 'next-auth/react'
import React from 'react'

const EmailPreview = ({ accounts }: {accounts: { [key: string]: string }}) => {
  const { data: session } = useSession()

  return (
    <>
    <div className="mt-8 border-b pb-5">
        <h3 className="text-2xl font-semibold tracking-tight">Email Preview</h3>
        <p className="leading-7 [&:not(:first-child)]:mt-1 text-muted-foreground">Here&apos;s a preview of what your email digest will look like</p>
        
        {/* Gmail-style Email Mockup */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 overflow-hidden">
            
            {/* Gmail Header */}
            <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">E</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Digest</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Subject Line */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Daily Social Media Digest
              </h2>
            </div>

            {/* Email Body */}
            <div className="px-4 py-4 space-y-4">
              
              {/* Account 1 */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">@</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">@{accounts.account1}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  "Just shipped a new feature that's going to revolutionize how developers work with APIs. The response has been incredible! 🚀"
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  💬 24 comments • ❤️ 156 likes • 🔄 12 retweets
                </div>
              </div>

              {/* Account 2 */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-xs font-bold">@</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">@{accounts.account2}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  "New design system components are live! Clean, accessible, and beautiful. Can't wait to see what you build with them ✨"
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  💬 18 comments • ❤️ 89 likes • 🔄 7 retweets
                </div>
              </div>

              {/* Account 3 */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-xs font-bold">@</span>
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white text-sm">@{accounts.account3}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  "Mentioned you in a comment: 'This is exactly what the industry needed! Brilliant execution 👏'"
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  💬 5 comments • ❤️ 23 likes • 🔄 3 retweets
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-3 border-t border-gray-200 dark:border-zinc-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Email Digest • {session?.user?.email || "you@example.com"}</span>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Unsubscribe</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      </>
  )
}

export default EmailPreview;