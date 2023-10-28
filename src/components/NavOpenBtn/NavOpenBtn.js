import { BsChevronCompactRight } from 'react-icons/bs';
import styles from'./navopenbtn.module.css';

const NavOpenBtn = ({handleState}) => {
    return (
        <div className={styles.btnOpen} onClick={handleState}>
            <BsChevronCompactRight
            style={{
                position: 'absolute',
                top: '0',
                right: '0',
                bottom:'0',
                left: '0',
                margin: 'auto'
                }}
                size="50"
                color="black"/>
        </div>
    )
}

export default NavOpenBtn;
