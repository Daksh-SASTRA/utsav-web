// Importing default modules
import Image from 'next/image'
import Link from 'next/link';

// Importing stylesheets
import styles from './smalltile.module.css'

function SmallTile({ workshopName, imageLocation, detailsPage }) {
    return <>
        <Link href={"/workshops/"+detailsPage}>
            <main className={styles.container}>
                <div className={styles.logo}>
                    <Image src={imageLocation} width={200} height={200} alt={workshopName} />
                </div>
                <h5 className={styles.workshopName}>{workshopName}</h5>
            </main>
        </Link>
    </>
}

export default SmallTile;