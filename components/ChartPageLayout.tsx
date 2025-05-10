import React from 'react'
import Head from 'next/head'
import type { KeystrokeData } from '@/types'
import Navbar from './Navbar'
import Footer from './Footer'

interface ChartPageLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  keystrokeData: KeystrokeData[]
  isLoading: boolean
  error: string | null
}

const ChartPageLayout = (props: ChartPageLayoutProps) => {
  if (props.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (props.error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          Error: {props.error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Head>
        <title>{props.title}</title>
        {props.description && <meta name="description" content={props.description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container-app py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          {props.title}
        </h1>
        <div className="w-full max-w-6xl mx-auto">
          {props.children}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ChartPageLayout 