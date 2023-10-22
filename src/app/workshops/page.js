import Head from 'next/head'
import styles from './page.module.css'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import Nav from '../../components/Nav/Nav';
import SmallTile from '@/components/SmallTile/SmallTile';
import workshops from '@/data/workshops.json';
import Footer from '@/components/Footer/Footer';
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
            {workshops.map((item, i)=>(
                <SmallTile key={i} workshopName={item.workshopName} imageLocation={item.image_url} detailsPage={i} />
            )) }
            </div>
        </main>
        <Footer />
    </>
}

export default Workshops