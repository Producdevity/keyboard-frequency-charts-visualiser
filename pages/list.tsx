import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Charts.module.css'
import { KeystrokeData } from '../types'
import mapKeystrokeData from '../utils/mapKeystrokeData'

const Bar: NextPage = () => {
  const [keystrokeData, setKeystrokeData] = useState<KeystrokeData[]>([])

  // fetch data from api/keystrokes
  useEffect(() => {
    fetch('http://localhost:3000/api/keystrokes')
      .then((res) => res.text())
      .then((keystrokesResponse) => {
        const _keystrokeData = mapKeystrokeData(keystrokesResponse)
        setKeystrokeData(_keystrokeData)
      })
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>BarChart Overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.mainList}>
        <h4>All Keys sorted</h4>
        <ul>
          {keystrokeData &&
            keystrokeData.map((keystroke) => (
              <li key={keystroke.key}>
                {keystroke.key} : <b>{keystroke.frequency}</b>
              </li>
            ))}
        </ul>
      </main>

      <Footer />
    </div>
  )
}

export default Bar
