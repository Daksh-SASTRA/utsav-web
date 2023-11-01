"use client"
import Head from 'next/head'
// Importing stylesheets
import styles from './page.module.css'

// Importing components
import Nav from '../../components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from 'react';
// import Footer from '../components/Footer/Footer'

function ScannerPage() {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        let scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 60,
                qrbox: { width: 250, height: 250 },
            });

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText, decodedResult) {
            setScanResult(decodedText);
        }

        function onScanFailure(error) {
            // setScanResult(error);
        }
    }, []);

    return (
        <>
            <main className={styles.main}>
                {
                    scanResult == null ?
                        <div id="reader"></div> :
                        <div id={styles.resultScreen}>{scanResult}</div>
                }
            </main>
        </>
    )
}

export default ScannerPage