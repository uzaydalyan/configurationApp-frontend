import styles from '../styles/Login.module.scss';
import Image from "next/image";
import Icon from '../public/icon.png';
import {useState} from "react";
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from "next/router";
import TextInput from "../components/TextInput";
import Head from "next/head";


export default function Login() {

    const router = useRouter();

    const handleSubmit = () => {
        if(email && password){
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                // Signed in
                const user = userCredential.user.getIdToken()
                    .then((token) => {
                        router.push("/");
                    })
                })
                .catch((error) => {
                    alert("Login Failed!" + " " + error)
                });
        }
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return(
        <div className="content">
            <Head>
                <title>Sign In</title>
                <meta name="description" content="Configuration app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.main}>
                <Image src={Icon} alt={"icon"} width={300} />
                <div className={styles.signintext}>Please sign in</div>
                <TextInput className={styles.loginInput} onChangeCallback={email => setEmail(email)} type={"text"} placeholder="E-Mail Address" />
                <TextInput className={styles.loginInput} onChangeCallback={password => setPassword(password)} type={"password"}  placeholder="Password" />
                <button onClick={handleSubmit} className={styles.button}>Sign in</button>
            </div>


        </div>
    );
}