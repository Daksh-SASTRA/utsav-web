import Head from 'next/head'

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import Nav from '../../components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import Schedule from '@/components/Schedule/Schedule';
import SideNav from '@/components/SideNav/SideNav';
// import Footer from '../components/Footer/Footer'

function SchedulePage() {
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
                <Schedule />
                {/* <Footer /> */}
            </main>
        </div>
    )
}

export default SchedulePage