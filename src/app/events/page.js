// Importing default modules
"use client"
import Head from 'next/head'

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import Nav from '../../components/Nav/Nav';
import Footer from '@/components/Footer/Footer';
import AllEvents from '@/components/AllEvents/AllEvents';
// Importing data elements
import EventsData from '@/components/config/EventsData.json'

function Events() {
    return <>
        <Head>
            <title>Daksh 2023 - Workshops</title>
            <meta name="description" content="Workshops for DAKSH 2023" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <BlobGlow />
            <Nav />
            <AllEvents />


        </main>
        <Footer />
    </>
}

export default Events