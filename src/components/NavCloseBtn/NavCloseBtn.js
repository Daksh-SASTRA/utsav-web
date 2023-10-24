import {  BsChevronCompactLeft } from 'react-icons/bs'
import styles from './navclosebtn.module.css'

const NavCloseBtn = ({handleState}) => {
    return (
        <div className={styles.btnClose} onClick={handleState}>
            <BsChevronCompactLeft
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

export default NavCloseBtn;
