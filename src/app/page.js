// Importing default modules
import Image from 'next/image'
import Link from 'next/link'

// Importing components
import Nav from '../components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import BlobGlow from '../components/BlobGlow/BlobGlow'
import SideNav from '@/components/SideNav/SideNav'

// Importing stylesheets
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <BlobGlow />
            <Nav />
            {/* <SideNav/> */}
            <section className={styles.firstview}>
                <Image src="/utsav_2024.png" width={500} height={500} alt='UTSAV 2023' />
                <p className={styles.buypara}>Click below to buy the Official Merchandise</p>
                <button className={styles.buybutton}><Link href='/merch'>Buy Now</Link></button>
            </section>
            <Footer />
        </main>
    )
}
