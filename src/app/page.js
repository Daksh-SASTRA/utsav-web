// Importing default modules
import Image from 'next/image'
import Link from 'next/link'

// Importing components
import Nav from '../components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import BlobGlow from '../components/BlobGlow/BlobGlow'

// Importing stylesheets
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <BlobGlow />
            <Nav />
            <section className={styles.firstview}>
                <Image src="/utsav_2024.png" width={500} height={500} alt='UTSAV 2023' />
                <p className={styles.buypara}>To buy the official Merchandise, click below</p>
                <button className={styles.buybutton}><Link href='/merch'>Buy Now</Link></button>
            </section>
            <Footer />
        </main>
    )
}
