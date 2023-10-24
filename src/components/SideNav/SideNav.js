"use client"
import React, { useState } from "react";
import  Link  from 'next/link'
import styles from './sidenav.module.css';
import NavOpenBtn from "../NavOpenBtn/NavOpenBtn";
import NavCloseBtn from "../NavCloseBtn/NavCloseBtn";
import BlobGlow from "../BlobGlow/BlobGlow";

const SideNav = () => {
    
    const [openBtn, setOpenBtn] = useState(false);
    const [closeBtn, setCloseBtn] = useState(false);
    const [sideNav, setSideNav] = useState(false);

    const openBtnState = () => {
        setOpenBtn(true);
        setCloseBtn(false);
        setSideNav(true);
    }

    const closeBtnState = () => {
        setCloseBtn(true);
        setOpenBtn(false);
        setSideNav(false);
    }

    return (
        <>
            {!(sideNav) ? (<NavOpenBtn handleState={openBtnState}/>) : (<NavCloseBtn handleState={closeBtnState}/>)}
            <div className={`${styles.container} ${openBtn ? styles.open : ""} ${closeBtn ? styles.close : ""}`}>
                <BlobGlow/>
                <div className={styles.sidenav}>
                    <div className={styles.heading}>
                        <h1>MENU</h1>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.item}><Link href='/merch'>Merchandise</Link> </div>
                        <div className={styles.item}><Link href='/events'>Events</Link> </div>
                        <div className={styles.item}><Link href='/workshops'>Workshops</Link> </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav;
