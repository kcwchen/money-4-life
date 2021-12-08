import WelcomePage from '../components/WelcomePage';
import NavBar from '../components/NavBar';
import Head from 'next/head';
import Hero from '../components/Hero';
import Nav from '../components/Nav.tsx';

export default function Home() {
  return (
    <>
      <Head>
        <title>Money 4 Life | Keep track of your spending habits</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Nav />
      <Hero />
    </>
  );
}
