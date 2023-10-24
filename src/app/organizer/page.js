import Head from 'next/head'

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import Nav from '../../components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import OrganizerElement from '@/components/OrganizerElement/OrganizerElement';
// import Footer from '../components/Footer/Footer'

function Organizers() {
    return (
        <div>
            <Head>
                <title>Daksh 2023 - Organizers</title>
                <meta name="description" content="Organizer Registration for DAKSH 2023" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <BlobGlow />
                <Nav />
                <OrganizerElement />
                {/* <Footer /> */}
            </main>
        </div>
    )
}

export default Organizers