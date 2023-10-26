'use client'

// Importing default modules
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Importing stylesheets
import styles from './page.module.css'

// Importing components
import Nav from '@/components/Nav/Nav'
import BlobGlow from '@/components/BlobGlow/BlobGlow'

// Importing data elements
import WorkshopsData from '@/components/config/WorkshopsData.json';

// Importing FireBase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithRedirect } from "firebase/auth";

//Importing Toastify - Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useSearchParams } from 'next/navigation';

// FireBase Configuration setup
const firebaseConfig = {
    apiKey: "AIzaSyBZz9rcJ94NXMG2ADxny1Ih0vTogj5Gy4Q",
    authDomain: "fir-5d43f.firebaseapp.com",
    projectId: "fir-5d43f",
    storageBucket: "fir-5d43f.appspot.com",
    messagingSenderId: "468073813099",
    appId: "1:468073813099:web:1d6d65e3f9ba5d32fdcd2e",
    measurementId: "G-D3JB5MVR4E"
};

const Page = () => {

    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const searchParams = useSearchParams();
    const targetWorkshop = searchParams.get('id');
    const workshopDetail = WorkshopsData[targetWorkshop];

    const [values, setValues] = useState({
        branch: "",
        phno: "",
        pmail: "",
        campus: "",
        yos: "",
        hod: "",
        through: "",
        transactionid: ""
    })

    const [error, setError] = useState(null)
    const [status, updateStatus] = useState({
        exist: false,
        payment: "no",
        event: "no"
    })

    const [validAuthToken, updateValidAuthToken] = useState(null)

    const [userDetails, setUserDetails] = useState({
        email: null,
        token: null,
        fullname: null,
        regno: null,
        userid: null
    })

    const [transVerifyStart, setTransVerifyStart] = useState(false)
    const [verificationDetails, setVerificationDetails] = useState({
        exist: false,
        amount: "0"
    })

    const handleChange = (e) => {
        e.preventDefault;
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(values);
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let empty = null;
        // let target = JSON.stringify(values)
        // console.log(Object.entries(values))
        Object.entries(values).forEach((el) => {
            Object.keys(el).forEach((property) => {
                if (el[property] === "" || el[property] === " ") {
                    console.log(el, el[property]);
                    setError("Kindly fill in all the data!");
                    empty = false;
                }
            })
        })
        if (empty === null) {
            empty = true;
        }
        // console.log(values, notEmpty);
        if (empty === true) {
            const url = `https://daksh.sastra.edu/registration/workshops/register?token=${userDetails.token}&wname=${workshopDetail.workshopId}&pmail=${values.pmail}&phno=${values.phno}&campus=${values.campus}&hod=${values.hod}&yos=${values.yos}&branch=${values.branch}&txnid=${values.transactionid}&through=${values.through}`;
            // console.log("Sending request")
            await fetch(url)
                .then((response) => {
                    response.json().then(async (res) => {
                        if (response.status === 200) {
                            // console.log(res)
                            if (res.status) {
                                toast.success(res.msg, {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: false,
                                    progress: undefined,
                                    theme: "colored",
                                });
                                fetchPaymentDetails(userDetails.userid);
                                await sleep(1000);
                                // signOut(auth).then(() => {
                                //     setUserDetails({ ...userDetails, email: null, token: null, fullname: null, regno: null, userid: null });
                                //     updateValidAuthToken(null);
                                //     toast.success("Payment under verification!", {
                                //         position: "top-right",
                                //         autoClose: 5000,
                                //         hideProgressBar: true,
                                //         closeOnClick: true,
                                //         pauseOnHover: true,
                                //         draggable: false,
                                //         progress: undefined,
                                //         theme: "colored",
                                //     });
                                // }).catch((error) => {
                                //     setError(error);
                                // })
                            }
                            else {
                                setError(res.msg);
                            }
                        }
                    })
                })
                .catch((error) => {
                    setError("Something went wrong with the request")
                });
        }
    }

    const studentLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                const fetchUID = user.uid;
                const [regisno, mail] = user.email.split('@');
                //console.log(regno, mail)
                if (mail.toString() === "sastra.ac.in") {
                    updateValidAuthToken(token)
                    // console.log("token",  token)
                    setUserDetails({
                        ...userDetails,
                        email: user.email,
                        token: user.accessToken,
                        userid: user.uid,
                        fullname: user.displayName,
                        regno: regisno
                    })
                    fetchPaymentDetails(fetchUID);
                }
                else {
                    signOut(auth).then(() => {
                        setError("Please use a valid SASTRA Mail ID");
                    }).catch((error) => {
                        setError(error)
                    })
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const fetchPaymentDetails = async (uid) => {
        const validURL = `https://daksh.sastra.edu/registration/workshops/getuser?uid=${uid}&wname=${workshopDetail.workshopId}`;
        await fetch(validURL).then((response) => {
            response.json().then((res) => {
                if (response.status === 200) {
                    // console.log(res)
                    if (res.exist) {
                        // console.log("success")
                        // alert('Success: Registration submitted successfully.');
                        updateStatus({ ...status, payment: res.payment, exist: res.exist, event: res.event })
                    }
                }
            })
        }).catch((error) => {
            // console.log(error);
            setError(error);
        })
    }

    const verifyPaymentFromServer = async () => {
        setTransVerifyStart(true);
        const validURL = `https://daksh.sastra.edu/registration/transactions/gettxn?txnid=${values.transactionid}`;
        await fetch(validURL).then((response) => {
            response.json().then((res) => {
                if (response.status === 200) {
                    // console.log(res)
                    if (res.exist) {
                        // console.log("success")
                        // alert('Success: Registration submitted successfully.');
                        setVerificationDetails({ ...verificationDetails, exist: res.exist, amount: res.amt })
                    }
                }
            })
            setTransVerifyStart(false);
        }).catch((error) => {
            // console.log(error);
            setError(error);
        })
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            setError(null)
        }
    }, [error])

    return (
        <div className={styles.main}>
            <BlobGlow />
            <Nav />
            <div className={styles.register_container}>
                {validAuthToken !== null ?
                    status.exist && status.event === workshopDetail.workshopId ?
                        <div className={styles.afteruipage}>
                            {/* <h2>Welcome back, {userDetails.fullname}</h2>
                            <h3>Your payment status: {status.payment === "full" ? <h3 style={{ color: 'green' }}>FULL PAID</h3> : <h3 style={{ color: 'orange' }}>UNDER VERIFICATION</h3>}</h3>
                            {status.payment === "full" ?
                                <h3>Your registration is successful!</h3>
                                :
                                <h3>Kindly Pay the full amount!</h3>
                            } */}
                            <h2>Hello, {userDetails.fullname}</h2>
                            {status.payment == "full" ? <h4>Thanks for Registering</h4> : <h4>Verification under progress</h4>}
                            {/* {transVerifyStart ? <h3>Verifying ....</h3> : <button className={styles.verifyButton} onClick={verifyPaymentFromServer}>Verify Now!</button> } */}
                            {/* {verificationDetails.exist ? <p>Received amount of ₹{verificationDetails.amount}</p> : <></> } */}
                        </div>
                        :
                        <>
                            <h2>Fill in the details below</h2>
                            <form onSubmit={handleSubmit} className={styles.register_form}>
                                <section><label>Name: </label>
                                    <input placeholder={userDetails.fullname} name="studname" type="text" disabled />
                                </section>
                                <section><label>Registration Number:</label>
                                    <input placeholder={userDetails.regno} name="registerno" type="text" disabled />
                                </section>
                                <section><label>SASTRA Mail ID:</label>
                                    <input placeholder={userDetails.email} name="email" type="email" disabled />
                                </section>
                                <section><label>Workshop Name: </label>
                                    <input placeholder={workshopDetail.workshopName} name="workshop" type="text" disabled />
                                </section>
                                {/* <section>
                            <label>Gender:</label>
                            <div className={styles.radioboxdiv}>
                                <div>
                                    <input name="gender" type="radio" onChange={handleChange} checked={values.gender == "Male"} value="Male" />
                                    <label htmlFor="Male">Male</label>
                                </div>
                                <div>
                                    <input name="gender" type="radio" onChange={handleChange} checked={values.gender == "Female"} value="Female" />
                                    <label htmlFor="Female">Female</label>
                                </div>
                            </div>
                        </section> */}
                                <section><label>Enter your branch name: </label>
                                    <input placeholder="Your branch name" name="branch" type="text" onChange={handleChange} />
                                </section>
                                <section><label>Enter your WhatsApp number:</label>
                                    <input placeholder="Your WhatsApp number" name="phno" type="tel" onChange={handleChange} />
                                </section>
                                <section><label>Enter your personal mail id:</label>
                                    <input placeholder="Your personal mail id" name="pmail" type="email" onChange={handleChange} />
                                </section>
                                <section>
                                    <label>Which campus are you from ?</label>
                                    <div className={styles.radioboxdiv}>
                                        <div>
                                            <input name="campus" type="radio" onClick={handleChange} value="Thanjavur" />
                                            <label htmlFor="Thanjavur">Thanjavur</label>
                                        </div>
                                        <div>
                                            <input name="campus" type="radio" onClick={handleChange} value="Kumbakonam" />
                                            <label htmlFor="Kumbakonam">Kumbakonam</label>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <label>Enter your year of study:</label>
                                    <div className={styles.radioboxdiv}>
                                        <div>
                                            <input name="yos" type="radio" onClick={handleChange} value="1" />
                                            <label htmlFor="1">1</label>
                                        </div>
                                        <div>
                                            <input name="yos" type="radio" onClick={handleChange} value="2" />
                                            <label htmlFor="2">2</label>
                                        </div>
                                        <div>
                                            <input name="yos" type="radio" onClick={handleChange} value="3" />
                                            <label htmlFor="3">3</label>
                                        </div>
                                        <div>
                                            <input name="yos" type="radio" onClick={handleChange} value="4" />
                                            <label htmlFor="4">4</label>
                                        </div>
                                    </div>
                                </section>
                                <section>
                                    <label>Hosteller or Dayscholar ?</label>
                                    <div className={styles.radioboxdiv}>
                                        <div>
                                            <input name="hod" type="radio" onClick={handleChange} value="Hosteller" />
                                            <label htmlFor="Hosteller">Hosteller</label>
                                        </div>
                                        <div>
                                            <input name="hod" type="radio" onClick={handleChange} value="Dayscholar" />
                                            <label htmlFor="Dayscolar">Dayscholar</label>
                                        </div>
                                    </div>
                                </section>
                                <section id={styles.throughhearing}>
                                    <label>How did you hear about this workshop?</label>
                                    <div className={`${styles.radioboxdiv} ${styles.throughradio}`}>
                                        <div>
                                            <input name="through" type="radio" onClick={handleChange} value="Social Media" />
                                            <label htmlFor="Social Media">Social Media</label>
                                        </div>
                                        <div>
                                            <input name="through" type="radio" onClick={handleChange} value="PR Desk" />
                                            <label htmlFor="PR Desk">PR Desk</label>
                                        </div>
                                        <div>
                                            <input name="through" type="radio" onClick={handleChange} value="Friends" />
                                            <label htmlFor="Friends">Friends</label>
                                        </div>
                                        <div>
                                            <input name="through" type="radio" onClick={handleChange} value="Website" />
                                            <label htmlFor="Website">Website</label>
                                        </div>
                                        <div>
                                            <input name="through" type="radio" onClick={handleChange} value="Notice Board" />
                                            <label htmlFor="Notice Board">Notice Board</label>
                                        </div>
                                    </div>
                                </section>
                                <div className={styles.qrcodesection}>
                                    <label>Pay ₹{workshopDetail.price} here: </label>
                                    {/* <h4>saneesha293@okicici</h4> */}
                                    <Image src={workshopDetail.gpay} width={250} height={250} alt="QR Code for scanning" />
                                    <input placeholder="Enter your UPI Reference Number" name="transactionid" type="text" onChange={handleChange} />
                                </div>
                                <div className={styles.register__btn__div}>
                                    <button type="submit" className={styles.register__btn}>Submit</button>
                                </div>
                            </form>
                        </>
                    :
                    <div className={styles.register_loginui}>
                        <button onClick={studentLogin}><FontAwesomeIcon icon={faGoogle} /> Sign In</button>
                        <p>* kindly use SASTRA mail to log in *</p>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Page