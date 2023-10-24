"use client"
import React, { useState } from "react";
import  Link  from 'next/link'
import { BsChevronCompactRight, BsChevronCompactLeft } from 'react-icons/bs'
import styles from './sidenav.module.css';
import { useSpring, animated } from '@react-spring/web'

const SideNav = () => {

    const [open, setOpen] = useState(false);

    const toggleNav = () => {
        if(open) {
            setOpen(false)
            console.log(open);
        }
        else {
            setOpen(true);
            console.log(open);
        }
    }

    const [props, api] = useSpring(
        () => ({
          from: { width: 0 },
          to: { width: 100 },
        }),
        []
      )

    console.log(props)
    // const duration = 1000;

    // const sidebarStyle = {
    //     transition: `width ${duration}ms`
    // }
    
    // const sidebarTransitionStyles = {
    //     entering: { width: 0 },
    //     entered: { width: '100%' },
    //     exiting: { width: '100%' },
    //     exited: { width: 0 }
    // }

    return (
        <>
        { (!open) ? (
        <div className={styles.btnOpen} onClick={toggleNav}>
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
        </div> ) : (
            // <Transition in={true} timeout={duration}>
            <div className={styles.container}>
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
                <div className={styles.btnClose} onClick={toggleNav}>
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
            </div>
            // </Transition>
        )
        }
        </>
    )
}

export default SideNav;