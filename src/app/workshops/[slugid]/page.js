'use client';

// Importing default modules
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';

// Importing stylesheets
import styles from "./details.module.css";

// Importing components
import Nav from '@/components/Nav/Nav';
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import Footer from '@/components/Footer/Footer';

// Importing data elements
import WorkshopsData from '@/components/config/WorkshopsData.json';
import Link from 'next/link';

export default function Page(params) {
  const workshopId = params.params.slugid;
  const workshopEvent = WorkshopsData[workshopId];
  const router = useRouter();
  function goBack() {
    router.push('/workshops')
  }
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
      <div className={styles.group}>
        <div className={styles.event_details}>
          <img className={styles.logo} src={workshopEvent.image_url} alt={workshopEvent.workshopName} />
          <div className={styles.sideContainer}>
            <h5 className={styles.title}>{workshopEvent.workshopName}</h5>
            <p className={styles.company}>{workshopEvent.company}</p>
            <p className={styles.tagline}>{workshopEvent.tagline}</p>
            <p className={styles.description}>{workshopEvent.description}</p>
            {/* <p className={styles.caption}>{workshopEvent.caption}</p> */}
            <p className={styles.price}>Price: T.B.A</p>
            <div className={styles.register}>
              <Link href={`/workshops/register?id=${workshopId}`}><button className={styles.register_button_workshops}>Register</button></Link>
            </div>
          </div>
        </div>
        {/* <span onClick={goBack} className={styles.back}>
          <Image src="/back.webp" alt='Back' width={60} height={60} />
        </span> */}
      </div>
    </main>
    {/* <Footer /> */}
  </>
}