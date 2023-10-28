'use client'
import Head from 'next/head'
// Importing stylesheets
import styles from './page.module.css'

// Importing components
import Nav from '@/components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import Event from '@/components/Event/Event';
import SideNav from '@/components/SideNav/SideNav';

// import Footer from '../components/Footer/Footer'

function EventPage({ params }) {

    return (
        <div>
            <Head>
                <title>Daksh 2023 - Schedule</title>
                <meta name="description" content="Schedule for DAKSH 2023" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <BlobGlow />
                <Nav />
                <SideNav/>
                <Event eventId={ params.eventId }/>
                {/* <Footer /> */}
            </main>
        </div>
    )
}

export default EventPage