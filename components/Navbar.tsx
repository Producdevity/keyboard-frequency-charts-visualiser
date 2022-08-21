import Link from 'next/link'
import React from 'react'
import styles from '../styles/Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/bar">
        <a className={styles.link}>Bar Chart</a>
      </Link>
      <Link href="/pie">
        <a className={styles.link}>Pie Chart</a>
      </Link>
      <Link href="/list">
        <a className={styles.link}>List Overview</a>
      </Link>
    </nav>
  )
}

export default Navbar
