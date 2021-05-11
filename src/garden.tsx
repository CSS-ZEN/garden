
import {useRef, useState} from 'react'

import Head from 'src/components/head'
import Link from 'src/components/link'
import type {IGraphqlPageInfo} from 'src/helpers/fetchGists'
import {FETCH_GISTS_CACHE_LIFETIME} from 'src/config'
import useBlocked from 'src/hooks/useBlocked'


export interface IThemeManifest {
    author: string
    contact: string
    name: string
}

export interface ITrialTheme {
    id: string
    theme: string
    manifest?: Partial<IThemeManifest>
}

/**
 * @description theme forked by csszen are supposed to have all right manifest informations
 * @todo maybe we can add a bot to apply automatic checks of gist contents in issues
 */
export interface ITheme extends ITrialTheme {
    manifest: IThemeManifest
}

export interface IThemeChoices {
    themes: ITheme[]
    pageInfo: IGraphqlPageInfo
}

export interface IGardenProps {
    theme: ITrialTheme
    themeChoices: IThemeChoices
}

export default function Garden ({theme, themeChoices}: IGardenProps) {
    return (
        <>
            <div className="page-wrapper">
                <Head
                    title="CSS Zen Garden: The Beauty of CSS Design"
                    author="Dave Shea"
                    description="A demonstration of what can be accomplished visually through CSS-based design."
                >
                    {/* <link rel="stylesheet" type="text/css" href={theme.theme}></link> */}
                    <style>{theme.theme}</style>
                </Head>

                <section className="intro" id="zen-intro">
                    <header role="banner">
                        <h1>CSS Zen Garden</h1>
                        <h2>The Beauty of <CssAbbr /> Design</h2>
                    </header>

                    <div className="summary" id="zen-summary" role="article">
                        <p>A demonstration of what can be accomplished through <CssAbbr />-based design. Select any style sheet from the list to load it into this page.</p>
                        <p>Download the example <HtmlSource label="html file" /> and <CssSource id={theme.id} label="css file" /></p>
                    </div>

                    <div className="preamble" id="zen-preamble" role="article">
                        <h3>The Road to Enlightenment</h3>
                        <p>Littering a dark and dreary road lay the past relics of browser-specific tags, incompatible <abbr title="Document Object Model">DOM</abbr>s, broken <CssAbbr /> support, and abandoned browsers.</p>
                        <p>We must clear the mind of the past. Web enlightenment has been achieved thanks to the tireless efforts of folk like the <abbr title="World Wide Web Consortium">W3C</abbr>, <abbr title="Web Standards Project">WaSP</abbr>, and the major browser creators.</p>
                        <p>The CSS Zen Garden invites you to relax and meditate on the important lessons of the masters. Begin to see with clarity. Learn to use the time-honored techniques in new and invigorating fashion. Become one with the web.</p>
                    </div>
                </section>

                <div className="main supporting" id="zen-supporting" role="main">
                    <div className="explanation" id="zen-explanation" role="article">
                        <h3>So What is This About?</h3>
                        <p>There is a continuing need to show the power of <CssAbbr />. The Zen Garden aims to excite, inspire, and encourage participation. To begin, view some of the existing designs in the list. Clicking on any one will load the style sheet into this very page. The <HtmlAbbr /> remains the same, the only thing that has changed is the external <CssAbbr /> file. Yes, really.</p>
                        <p><CssAbbr /> allows complete and total control over the style of a hypertext document. The only way this can be illustrated in a way that gets people excited is by demonstrating what it can truly be, once the reins are placed in the hands of those able to create beauty from structure. Designers and coders alike have contributed to the beauty of the web; we can always push it further.</p>
                    </div>

                    <div className="participation" id="zen-participation" role="article">
                        <h3>Participation</h3>
                        <p>Strong visual design has always been our focus. You are modifying this page, so strong <CssAbbr /> skills are necessary too, but the example files are commented well enough that even <CssAbbr /> novices can use them as starting points. Please see the <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="A listing of CSS-related resources"><><CssAbbr /> Resource Guide</></Link> for advanced tutorials and tips on working with <CssAbbr />.</p>
                        <p>You may modify the style sheet in any way you wish, but not the <HtmlAbbr />. This may seem daunting at first if you&#8217;ve never worked this way before, but follow the listed links to learn more, and use the sample files as a guide.</p>
                        <p>Download the sample <HtmlSource label="HTML" /> and <CssSource id={theme.id} label="CSS" /> to work on a copy locally. Once you have completed your masterpiece (and please, don&#8217;t submit half-finished work) upload your <CssAbbr /> file to a web server under your control. <Link href="/submit" title="Use the contact form to send us your CSS file">Send us a link</Link> to an archive of that file and all associated assets, and if we choose to use it we will download it and place it on our server.</p>
                    </div>

                    <div className="benefits" id="zen-benefits" role="article">
                        <h3>Benefits</h3>
                        <p>Why participate? For recognition, inspiration, and a resource we can all refer to showing people how amazing <CssAbbr /> really can be. This site serves as equal parts inspiration for those working on the web today, learning tool for those who will be tomorrow, and gallery of future techniques we can all look forward to.</p>
                    </div>

                    <div className="requirements" id="zen-requirements" role="article">
                        <h3>Requirements</h3>
                        <p>Where possible, we would like to see mostly <abbr title="Cascading Style Sheets, levels 1 and 2">CSS 1 &amp; 2</abbr> usage. <abbr title="Cascading Style Sheets, levels 3 and 4">CSS 3 &amp; 4</abbr> should be limited to widely-supported elements only, or strong fallbacks should be provided. The CSS Zen Garden is about functional, practical <CssAbbr /> and not the latest bleeding-edge tricks viewable by 2% of the browsing public. The only real requirement we have is that your <CssAbbr /> validates.</p>
                        <p>Luckily, designing this way shows how well various browsers have implemented <CssAbbr /> by now. When sticking to the guidelines you should see fairly consistent results across most modern browsers. Due to the sheer number of user agents on the web these days &#8212; especially when you factor in mobile &#8212; pixel-perfect layouts may not be possible across every platform. That&#8217;s okay, but do test in as many as you can. Your design should work in at least IE9+ and the latest Chrome, Firefox, iOS and Android browsers (run by over 90% of the population).</p>
                        <p>We ask that you submit original artwork. Please respect copyright laws. Please keep objectionable material to a minimum, and try to incorporate unique and interesting visual themes to your work. We&#8217;re well past the point of needing another garden-related design.</p>
                        <p>This is a learning exercise as well as a demonstration. You retain full copyright on your graphics (with limited exceptions, see <Link href="/about#submission-guidelines">submission guidelines</Link>), but we ask you release your <CssAbbr /> under a Creative Commons license identical to the <Link href="https://raw.githubusercontent.com/csszen/garden/master/LICENSE" title="View the Zen Garden's license information.">one on this site</Link> so that others may learn from your work.</p>
                        <p role="contentinfo">By <Link href="http://www.mezzoblue.com/">Dave Shea</Link>. Graciously hosted by <Link href="https://vercel.com/">Vercel</Link>. Now available: <Link href="http://www.amazon.com/exec/obidos/ASIN/0321303474/mezzoblue-20/">Zen Garden, the book</Link>.</p>
                    </div>

                    <footer>
                        <Link href="http://validator.w3.org/check/referer" title="Check the validity of this site&#8217;s HTML" className="zen-validate-html">HTML</Link>
                        <Link href="http://jigsaw.w3.org/css-validator/check/referer" title="Check the validity of this site&#8217;s CSS" className="zen-validate-css">CSS</Link>
                        <Link href="https://raw.githubusercontent.com/csszen/garden/master/LICENSE" title="View the Creative Commons license of this site: Attribution-NonCommercial-ShareAlike." className="zen-license">CC</Link>
                        <Link href="https://github.com/csszen/garden/issues" title="Read about the accessibility of this site" className="zen-accessibility">A11y</Link>
                        <Link href="https://github.com/csszen/garden" title="Fork this site on Github" className="zen-github">GH</Link>
                    </footer>

                </div>

                <Aside theme={theme} themeChoices={themeChoices} />
            </div>

            <div className="extra1" role="presentation" />
            <div className="extra2" role="presentation" />
            <div className="extra3" role="presentation" />
            <div className="extra4" role="presentation" />
            <div className="extra5" role="presentation" />
            <div className="extra6" role="presentation" />
        </>
    )
}


function Aside ({theme, themeChoices}: IGardenProps) {
    const [themeInfo, setThemes] = useState(themeChoices)

    const [, fetchThemes] = useBlocked(async (api: string) => {
        const r = await fetch(api, {
            headers: {
                'Cache-Control': `s-maxage=${FETCH_GISTS_CACHE_LIFETIME}, stale-while-revalidate`,
            },
        })
        const r2 = await r.json()
        setThemes(r2)
    })

    const handleNextThemes = async () => {
        const {pageInfo} = themeInfo

        fetchThemes(`/api/themes?after=${pageInfo.endCursor}`)
    }

    const handlePreviousThemes = async () => {
        const {pageInfo} = themeInfo

        fetchThemes(`/api/themes?before=${pageInfo.startCursor}`)
    }

    return (
        <aside className="sidebar">
            <div className="wrapper">
                <div className="design-selection" id="design-selection">
                    <h3 className="select">Select a Design:</h3>
                    <nav>
                        <ul>
                            {themeInfo.themes.map(themeChoice => <ThemeChoice theme={themeChoice} key={themeChoice.id} />)}
                        </ul>
                    </nav>
                </div>
                <div className="design-archives" id="design-archives">
                    <h3 className="archives">Archives:</h3>
                    <nav>
                        <ul>
                            {themeInfo.pageInfo.hasNextPage && <li className="next"><a onClick={handleNextThemes}>Next Designs <span className="indicator">&rsaquo;</span></a></li>}
                            {themeInfo.pageInfo.hasPreviousPage && <li className="previous"><a onClick={handlePreviousThemes}><span className="indicator">&lsaquo;</span> Previous Designs</a></li>}
                            {/* <li className="lucky"><Link href="/lucky">I'm feeling Lucky</Link></li> */}
                            <li className="viewall"><Link href="/all/1" title="View every submission to the Zen Garden.">View All Designs</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="zen-resources" id="zen-resources">
                    <h3 className="resources">Resources:</h3>
                    <ul>
                        <li className="view-css"><Link href={`/api/theme/${theme.id}`} title="View the source CSS file of the currently-viewed design.">View This Design&#8217;s <CssAbbr /></Link></li>
                        <li className="css-resources"><Link href="https://developer.mozilla.org/en-US/docs/Web/CSS" title="Links to great sites with information on using CSS."><CssAbbr /> Resources</Link></li>
                        <li className="zen-faq"><Link href="/about" title="A list of Frequently Asked Questions about the Zen Garden."><abbr title="Frequently Asked Questions">About</abbr></Link></li>
                        <li className="zen-submit"><Link href="/submit" title="Send in your own CSS file.">Submit a Design</Link></li>
                        <li className="zen-translations"><a href="" title="View translated versions of this page.">Translations</a></li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}


const ThemeChoice = ({theme: {id, manifest}}: {theme: ITheme}) => (
    <li><Link href={`/theme/${id}`} className="design-name">{manifest.name}</Link> by <Link href={manifest.contact} className="designer-name">{manifest.author}</Link></li>
)

const HtmlSource = ({label}: {label: string}) => {
    const $a = useRef<HTMLAnchorElement>(null)
    const onClick = () => {
        if ($a.current) {
            $a.current.href = `data:text/html;charset=UTF-8,${encodeURIComponent(document.body.outerHTML)}`
        }
    }
    return <a ref={$a} onClick={onClick} href="#" title="This page's source HTML code, not to be modified." download="example.html">{label}</a>
}

const CssSource = ({id, label}: {id: string, label: string}) => (
    <Link href={`/api/theme/${id}`} title="This page's source CSS code, the file you may modify." download="example.css">{label}</Link>
)

const CssAbbr = () => <abbr title="Cascading Style Sheets">CSS</abbr>

const HtmlAbbr = () => <abbr title="HyperText Markup Language">HTML</abbr>
