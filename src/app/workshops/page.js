// Importing default modules
import Head from 'next/head'

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import Nav from '@/components/Nav/Nav';
import SmallTile from '@/components/SmallTile/SmallTile';
import Footer from '@/components/Footer/Footer';

// Importing data elements
import WorkshopsData from '@/components/config/WorkshopsData.json'

function Workshops() {
    return <>
        <Head>
            <title>Daksh 2023 - Workshops</title>
            <meta name="description" content="Workshops for DAKSH 2023" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
            <BlobGlow />
            <Nav />
            <h1 className={styles.heading}>Workshops</h1>
            <div className={styles.tilecontainer}>
                {WorkshopsData.map((item, i) => (
                    <SmallTile key={i} workshopName={item.workshopName} imageLocation={item.image_url} detailsPage={i} />
                ))}
            </div>
        </main>
        <Footer />
    </>
}

export default Workshops