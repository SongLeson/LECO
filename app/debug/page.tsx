'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    setDebugInfo({
      location: typeof window !== 'undefined' ? window.location.href : 'SSR',
      basePath: process.env.NEXT_PUBLIC_BASE_PATH || 'not set',
      nodeEnv: process.env.NODE_ENV,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR',
      stylesheets: typeof document !== 'undefined' ? 
        Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(link => (link as HTMLLinkElement).href) : 
        'SSR',
      scripts: typeof document !== 'undefined' ? 
        Array.from(document.querySelectorAll('script[src]')).map(script => (script as HTMLScriptElement).src) : 
        'SSR',
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">Debug Information</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Environment Info</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">CSS Test</h2>
          <div className="space-y-4">
            <div className="bg-leco-electric-blue text-black p-4 rounded">
              LECO Electric Blue Background (should be bright blue)
            </div>
            <div className="text-leco-electric-blue">
              LECO Electric Blue Text (should be bright blue)
            </div>
            <div className="bg-gradient-to-r from-leco-electric-blue to-leco-plasma-purple p-4 rounded">
              Gradient Background (should be blue to purple)
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">Tailwind Test</h2>
          <div className="space-y-2">
            <div className="bg-red-500 text-white p-2 rounded">Red background (Tailwind basic)</div>
            <div className="bg-blue-500 text-white p-2 rounded">Blue background (Tailwind basic)</div>
            <div className="bg-green-500 text-white p-2 rounded">Green background (Tailwind basic)</div>
          </div>
        </div>
      </div>
    </div>
  )
}
