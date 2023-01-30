import Head from "next/head";

import "styles/globals.css";
import { Nav, Alert, NavUser } from "components";
import { useRouter } from "next/router";

export default App;

function App({ Component, pageProps }) {
  const { asPath } = useRouter();

  let nav;
  if (asPath && asPath != "/account/login" ) {
    if (asPath != "/user" && asPath != "/user/profile") {
        nav = <Nav />;
    } else {
        nav = <NavUser />;
    }
  }

  return (
    <>
      <Head>
        <title>DEXA - WFH Attendance App</title>

        <link
          href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="app-container bg-light">
        {nav}

        <Alert />
        <div className="container pt-4 pb-4">
          <Component {...pageProps} />
        </div>
      </div>

      <div className="text-center mt-4">
        <p>DEXA - WFH Attendance App @2023</p>
      </div>
    </>
  );
}
