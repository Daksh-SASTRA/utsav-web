// Importing default modules
import Image from 'next/image'

// Importing stylesheets
import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faLinkedin, faMedium, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className={styles.footer_container}>
            <Image src='/daksh_2024.png' width={140} height={50} alt="Daksh Official Logo 2024" />
            {/* <div className={styles.socialmedia}>
                    <FontAwesomeIcon icon={faMedium} />
                    <FontAwesomeIcon icon={faYoutube} />
                    <FontAwesomeIcon icon={faLinkedin} />
                    <FontAwesomeIcon icon={faXTwitter} />
                    <FontAwesomeIcon icon={faInstagram} />
                </div> */}
            <div>Designed with 💖 by DDT & Coded with ❤️‍🔥 by DWT</div>

        </div>
    )
}

export default Footer