"use client"

//Importing default components
import { useEffect, useState } from 'react';
import Head from 'next/head'

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import Nav from '../../components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow';
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast, ToastContainer } from 'react-toastify';
// import Footer from '../components/Footer/Footer'

function ScannerPage() {

    const [scanResult, setScanResult] = useState(null);
    const [workshopID, setWorkshopID] = useState({
        id: null,
        workshopName: null
    });
    const [results, setResults] = useState({
        exist: null,
        event: null,
        payment: null
    })

    const fetchDetails = async (decodedText) => {
        const url = `https://daksh.sastra.edu/registration/workshops/getuserqr?regno=${decodedText}&wname=${workshopID.workshopName}`;
        await fetch(url).then((response) => {
            response.json().then((res) => {
                if (response.status == 200) {
                    if (res.exist) {
                        setResults({...results, payment: res.payment, exist: res.exist, event: res.event})
                    }
                    else {
                        setResults({...results, payment: "Not Paid", exist: false, event: null})
                    }
                }
            })
        })
    }

    const goBack = () => {
        setWorkshopID({...workshopID, id: null, workshopName: null});
        setResults({...results, exist: null, event: null, payment: null});
        setScanResult(null);
    }

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
            fetchDetails(decodedText);
        }

        function onScanFailure(error) {
            // toast.error(error, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: false,
            //     progress: undefined,
            //     theme: "colored",
            // });
        }
    }, [workshopID]);



    return (
        <>
            <main className={styles.scanner_container}>
                {
                    workshopID.id === null ?
                        <><h3>Select the workshop:</h3>
                            <div className={styles.workshop_selection}>
                                <div className={styles.workshop_name} onClick={() => setWorkshopID({ ...workshopID, id: '0', workshopName: "INTEL" })}>INTEL</div>
                                <div className={styles.workshop_name} onClick={() => setWorkshopID({ ...workshopID, id: '1', workshopName: "IBM" })}>IBM</div>
                            </div></>
                        :
                        <h5>Scan the person&#39;s ID card for {workshopID.workshopName} Workshop!</h5>
                }
                {
                    scanResult == null ?
                        <div id="reader"></div>
                        :
                        <div id={styles.resultScreen}>
                            <h2>The student {scanResult} is a {results.exist === true ? <b>VALID</b> : <b>INVALID</b>} workshop attendee for the {results.event} workshop</h2>
                            {results.exist ? <h5>Payment status: {results.payment}</h5> : <></>}
                            <button onClick={goBack}>Go Back</button>
                        </div>
                }
                <ToastContainer />
            </main>
        </>
    )
}

export default ScannerPage