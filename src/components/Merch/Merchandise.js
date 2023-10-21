"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Importing stylesheets
import styles from './merchandise.module.css'
// import cstyles from '../Contact/contact.module.css';
// import side from '../../public/shirtpreview/Side.png'
// import Buttons from '../Buttons/Buttons';

// Importing other modules
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

// import btn from '../Buttons/buttons.module.css';

function Merch({ merchName, imageLink, shoppingLink }) {
    const tshirt = imageLink;

    const [index, setIndex] = useState(0)

    return (
        <div className={styles.glassyCard}>
            <div className={styles.imageContainer}>
                <h1>{merchName}</h1>
                <div className={styles.merchImage}>
                    {/* <FontAwe */}
                    <Image src={tshirt[index]} width={480} height={600} alt={merchName} />
                </div>
            </div>
            {/* <div className={btn.global_button}>
            <Link style={{borderRadius: "5px"}} href={shoppingLink} >SHOP NOW &rarr;</Link>
        </div> */}
        </div>
    )
}
export default Merch;