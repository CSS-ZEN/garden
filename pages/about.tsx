
import Head from 'next/head'

import dynamic from 'next/dynamic'
const Button = dynamic(() => import('../components/button'))

import styles from '../styles/about.module.scss'


const About = () => (
    <article className={styles.about}>
        <Head>
            <title>About</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>👋 Hi, I’m <a href="https://github.com/csszen">@csszen</a></h1>
        <p>Building <a href="https://github.com/csszen/garden">csszen/garden</a>, which originates from <a href="https://github.com/mezzoblue/csszengarden.com">mezzoblue/csszengarden.com</a>.</p>
        <p>Contributing welcomed!</p>
        <p>You can find me at <a href="https://github.com/csszen">Github</a>.</p>
        <Button label="button" />
    </article>
)

export default About
