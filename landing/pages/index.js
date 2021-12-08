import Head from 'next/head';
import Hero from '../components/Hero';
import Nav from '../components/Nav.tsx';
import Feature from '../components/Feature.js';
import SignUpNow from '../components/SignUpNow';

export default function Home() {
  return (
    <>
      <Head>
        <title>Money 4 Life | Keep track of your spending habits</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://unpkg.com/aos@next/dist/aos.css' />
      </Head>
      <Nav />
      <Hero />
      <Feature
        img='features1'
        id='features'
        heading='Get control over your subscriptions'
        desc='Never pay for an unwanted subscription again. M4L finds and tracks your subscriptions.'
        inverted
      />
      <Feature
        img='features2'
        heading='Create a budget that works for you'
        desc='Setup a budget that automatically monitors your spending by category and keeps you on track towards your goals.'
      />
      <Feature
        img='features3'
        heading='Stay on top of your spending'
        desc='Get an effortless breakdown of your finances to see where your money is going and how to improve.'
        inverted
      />
      <SignUpNow />
    </>
  );
}
