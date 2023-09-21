import Head from 'next/head'
import Navbar from "../components/Navbar";
import ParameterList from "../components/ParameterList";
import {auth} from '../firebase';
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(!user){
                router.push("/login");
            }
        })
    }, []);

    const updateLoadingState = (isLoading : boolean) => {
        setIsLoading(isLoading)
    }

  return (
    <div>
      <Head>
        <title>Configurations</title>
        <meta name="description" content="Configuration app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
          <div className="content">
              <ParameterList loadingCallback={updateLoadingState}/>
              <LoadingSpinner  isLoading={isLoading} />
          </div>

      </main>

      <footer>

      </footer>
    </div>
  )
}
