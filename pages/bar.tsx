import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import BarChart from '../components/BarChart'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Charts.module.css'
import Chart from 'chart.js/auto'

import { CategoryScale } from 'chart.js'

Chart.register(CategoryScale)

const Bar: NextPage = () => {
  const [keystrokes, setKeystrokes] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:3000/api/keystrokes')
      .then((res) => res.text())
      .then((keystrokesResponse) => setKeystrokes(keystrokesResponse))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>BarChart Overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        {keystrokes ? <BarChart keystrokes={keystrokes} /> : 'Loading...'}
      </main>

      <Footer />
    </div>
  )
}

export default Bar
