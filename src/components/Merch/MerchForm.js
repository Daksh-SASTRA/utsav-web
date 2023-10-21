"use client"

// Importing NextJS/ReactJS modules
import { useEffect, useState } from 'react'
import Image from 'next/image';

// Importing stylesheets
import styles from './merch.module.css'
import MerchItem from "./Merchandise";

// Importing assets
import tshirtf from '../../../public/shirtpreview/Front.webp'
import tshirtb from '../../../public/shirtpreview/Back.webp'

// Importing FireBase
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

//Importing Toastify - Notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

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

function MerchForm() {

    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const tshirt = [tshirtf, tshirtb]

    const [values, setValues] = useState({
        phnno: "",
        gender: "",
        campus: "",
        yos: "",
        branch: "",
        size: "",
        hod: "",
        transactionid: ""
    })

    const [index, updateIndex] = useState(0)
    const [notEmpty, updateNotEmpty] = useState(null)
    const [error, setError] = useState(null)
    const [status, updateStatus] = useState({
        exist: false,
        delivered: "no",
        payment: "no"
    })

    const [validAuthToken, updateValidAuthToken] = useState(null)
    const [userDetails, setUserDetails] = useState({
        email: null,
        token: null,
        fullname: null,
        regno: null,
        userid: null
    })

    // const refreshState = (e) => {
    //     e.preventDefault();
    //     setValues({...values})
    // }

    const handleChange = (fname) => (e) => {
        e.preventDefault();
        setValues({ ...values, [fname]: e.target.value });
        console.log(values);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValues({...values})
        // let target = JSON.stringify(values)
        // console.log(Object.entries(values))
        Object.entries(values).forEach((el) => {
            Object.keys(el).forEach((property) => {
                if (el[property] === "" || el[property] === " ") {
                    console.log(el, el[property]);
                    setError("Kindly fill in all the data!")
                    updateNotEmpty(false)
                }
            })
        })
        if (notEmpty === null) {
            updateNotEmpty(true)
        }
        // console.log(values)
        if (notEmpty === true) {
            const url = `https://daksh.sastra.edu/registration/merch/register?token=${userDetails.token}&name=${values.stdname}&phno=${values.phnno}&gender=${values.gender}&campus=${values.campus}&yos=${values.yos}&branch=${values.branch}&tsize=${values.size}&hod=${values.hod}&txnid=${values.transactionid}`;
            // console.log("Sending request")
            await fetch(url)
                .then((response) => {
                    response.json().then((res) => {
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
        const validURL = `https://daksh.sastra.edu/registration/merch/getuser?uid=${uid}`;
        await fetch(validURL).then((response) => {
            response.json().then((res) => {
                if (response.status === 200) {
                    // console.log(res)
                    if (res.exist) {
                        // console.log("success")
                        // alert('Success: Registration submitted successfully.');
                        updateStatus({...status, delivered: res.delivered, payment: res.payment, exist: res.exist})
                    }
                }
            })
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
        <div className={styles.merch_container}>
            <MerchItem merchName={"TSHIRT"} imageLink={tshirt} shoppingLink="/merch/tshirt" />
            {validAuthToken !== null ?
                status.exist ?
                    <div className={styles.merch_confirmationcontainer}>
                        <h2>Welcome back, {userDetails.fullname}</h2>
                        <h3>Your payment status: {status.payment !== "no" ? status.payment == "half" ? <h3 style={{color: 'orange'}}>HALF PAID</h3> : <h3 style={{color: 'green'}}>FULL PAID</h3> : <h3 style={{color: 'orange'}}>UNDER VERIFICATION</h3>}</h3>
                        {status.payment === "full" ? 
                        <h3>Your T-Shirt will be delivered soon!</h3>
                        :
                        <h3>Kindly Pay the full amount!</h3>
                        }
                    </div>
                    :
                    <form onSubmit={handleSubmit} className={styles.merch_form}>
                    <h2>Get your T-Shirt by filling up the following details</h2>
                    <section><label>Name: </label>
                        <input placeholder={userDetails.fullname} name="studname" type="text" disabled />
                    </section>
                    <section><label>Registration Number:</label>
                        <input placeholder={userDetails.regno} name="registerno" type="text" disabled />
                    </section>
                    <section><label>SASTRA Mail ID:</label>
                        <input placeholder={userDetails.email} name="email" type="email" disabled />
                    </section>
                    <section>
                        <label>Gender:</label>
                        <div className={styles.radioboxdiv}>
                            <div>
                                <input name="gender" type="radio" onClick={() => handleChange("gender")} value="Male" />
                                <label htmlFor="Male">Male</label>
                            </div>
                            <div>
                                <input name="gender" type="radio" onClick={() => handleChange("gender")} value="Female" />
                                <label htmlFor="Female">Female</label>
                            </div>
                        </div>
                    </section>
                    <section>
                        <label>Which campus are you from ?</label>
                        <div className={styles.radioboxdiv}>
                            <div>
                                <input name="campus" type="radio" onClick={() => handleChange("campus")} value="Thanjavur" />
                                <label htmlFor="Thanjavur">Thanjavur</label>
                            </div>
                            <div>
                                <input name="campus" type="radio" onClick={() => handleChange("campus")} value="Kumbakonam" />
                                <label htmlFor="Kumbakonam">Kumbakonam</label>
                            </div>
                        </div>
                    </section>
                    <section><label>Enter your mobile number:</label>
                        <input placeholder="Your mobile number" name="phoneno" type="tel" onChange={handleChange("phnno")} />
                    </section>
                    <section>
                        <label>Enter your year of study:</label>
                        <div className={styles.radioboxdiv}>
                            <div>
                                <input name="yos" type="radio" onClick={() => handleChange("yos")} value="1" />
                                <label htmlFor="1">1</label>
                            </div>
                            <div>
                                <input name="yos" type="radio" onClick={() => handleChange("yos")} value="2" />
                                <label htmlFor="2">2</label>
                            </div>
                            <div>
                                <input name="yos" type="radio" onClick={() => handleChange("yos")} value="3" />
                                <label htmlFor="3">3</label>
                            </div>
                            <div>
                                <input name="yos" type="radio" onClick={() => handleChange("yos")} value="4" />
                                <label htmlFor="4">4</label>
                            </div>
                        </div>
                    </section>
                    <section><label>Enter your branch name: </label>
                        <input placeholder="Your branch name" name="branch" type="text" onChange={handleChange("branch")} />
                    </section>
                    <section>
                        <label>Hosteller or Dayscholar ?</label>
                        <div className={styles.radioboxdiv}>
                            <div>
                                <input name="hod" type="radio" onClick={() => handleChange("hod")} value="Dayscholar" />
                                <label htmlFor="Dayscolar">Dayscholar</label>
                            </div>
                            <div>
                                <input name="hod" type="radio" onClick={() => handleChange("hod")} value="Hosteller" />
                                <label htmlFor="Hosteller">Hosteller</label>
                            </div>
                        </div>
                    </section>
                    <section>
                        <label>Enter your T-Shirt size:</label>
                        <div className={`${styles.radioboxdiv} ${styles.tshirtradio}`}>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="XS" />
                                <label htmlFor="XS">XS</label>
                            </div>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="S" />
                                <label htmlFor="S">S</label>
                            </div>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="M" />
                                <label htmlFor="M">M</label>
                            </div>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="L" />
                                <label htmlFor="L">L</label>
                            </div>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="XL" />
                                <label htmlFor="XL">XL</label>
                            </div>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="2XL" />
                                <label htmlFor="2XL">2XL</label>
                            </div>
                            <div>
                                <input name="size" type="radio" onClick={() => handleChange("size")} value="3XL" />
                                <label htmlFor="3XL">3XL</label>
                            </div>
                        </div>
                    </section>
                    <section className={styles.qrcodesection}>
                        <label>Pay ₹250 here</label>
                        <h4>saneesha293@okicici</h4>
                        <Image src='/payment.jpg' width={200} height={200} alt="QR Code for scanning" />
                        <input placeholder="Enter your transaction id" name="transactionid" type="text" onChange={handleChange("transactionid")} />
                    </section>
                    <div className={styles.register__btn__div}>
                        <button type="submit" className={styles.register__btn}>Submit</button>
                    </div>
                </form>
                :
                <div className={styles.loginui}>
                    <button onClick={studentLogin}><FontAwesomeIcon icon={faGoogle} /> Sign In</button>
                    <p>* kindly use SASTRA mail to log in *</p>
                </div>
            }
            <ToastContainer />
        </div>
    )
}
export default MerchForm;