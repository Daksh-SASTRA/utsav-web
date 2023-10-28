import Head from 'next/head'

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import MerchForm from "../../components/Merch/MerchForm";
import Nav from '../../components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import SideNav from '@/components/SideNav/SideNav';
// import Footer from '../components/Footer/Footer'

function MerchandisePage() {
    return (
        <div>
            <Head>
                <title>Daksh 2023 - Merchandise</title>
                <meta name="description" content="Merchandise for DAKSH 2023" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <BlobGlow />
                <Nav />
                <SideNav/>
                <MerchForm />
                {/* <Footer /> */}
            </main>
        </div>
    )
}

export default MerchandisePage