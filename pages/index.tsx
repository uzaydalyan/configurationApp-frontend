import Head from 'next/head'
import Navbar from "../components/Navbar";
import ParameterList from "../components/ParameterList";

export default function Home() {
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
              <ParameterList />
          </div>

      </main>

      <footer>

      </footer>
    </div>
  )
}
