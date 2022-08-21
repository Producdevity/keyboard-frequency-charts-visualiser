import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PieChart from '../components/PieChart'
import styles from '../styles/Charts.module.css'
import Chart from 'chart.js/auto'

import { CategoryScale } from 'chart.js'

Chart.register(CategoryScale)

const Pie: NextPage = () => {
  const [keystrokes, setKeystrokes] = useState<string>('')

  useEffect(() => {
    fetch('http://localhost:3000/api/keystrokes')
      .then((res) => res.text())
      .then((keystrokesResponse) => setKeystrokes(keystrokesResponse))
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>PieChart Overview</title>
      </Head>

      <Navbar />

      <main className={styles.main}>
        {keystrokes ? <PieChart keystrokes={keystrokes} /> : 'Loading...'}
      </main>

      <Footer />
    </div>
  )
}

export default Pie
