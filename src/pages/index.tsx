import Head from 'components/head'


export default function Home () {
    return (
        <div className="page-wrapper">
            <Head
              title="CSS Zen Garden: The Beauty of CSS Design"
              author="Dave Shea"
              description="A demonstration of what can be accomplished visually through CSS-based design."
            />

            <section className="intro" id="zen-intro">
                <header>
                    <h1>CSS Zen Garden</h1>
                    <h2>The Beauty of <abbr title="Cascading Style Sheets">CSS</abbr> Design</h2>
                </header>

                <div className="summary" id="zen-summary" role="article">
                    <p>A demonstration of what can be accomplished through <abbr title="Cascading Style Sheets">CSS</abbr>-based design. Select any style sheet from the list to load it into this page.</p>
                    <p>Download the example <a href="/examples/index" title="This page's source HTML code, not to be modified.">html file</a> and <a href="/examples/style.css" title="This page's sample CSS, the file you may modify.">css file</a></p>
                </div>

                <div className="preamble" id="zen-preamble" role="article">
                    <h3>The Road to Enlightenment</h3>
                    <p>Littering a dark and dreary road lay the past relics of browser-specific tags, incompatible <abbr title="Document Object Model">DOM</abbr>s, broken <abbr title="Cascading Style Sheets">CSS</abbr> support, and abandoned browsers.</p>
                    <p>We must clear the mind of the past. Web enlightenment has been achieved thanks to the tireless efforts of folk like the <abbr title="World Wide Web Consortium">W3C</abbr>, <abbr title="Web Standards Project">WaSP</abbr>, and the major browser creators.</p>
                    <p>The CSS Zen Garden invites you to relax and meditate on the important lessons of the masters. Begin to see with clarity. Learn to use the time-honored techniques in new and invigorating fashion. Become one with the web.</p>
                </div>
            </section>

            <div className="main supporting" id="zen-supporting" role="main">
                <div className="explanation" id="zen-explanation" role="article">
                    <h3>So What is This About?</h3>
                    <p>There is a continuing need to show the power of <abbr title="Cascading Style Sheets">CSS</abbr>. The Zen Garden aims to excite, inspire, and encourage participation. To begin, view some of the existing designs in the list. Clicking on any one will load the style sheet into this very page. The <abbr title="HyperText Markup Language">HTML</abbr> remains the same, the only thing that has changed is the external <abbr title="Cascading Style Sheets">CSS</abbr> file. Yes, really.</p>
                    <p><abbr title="Cascading Style Sheets">CSS</abbr> allows complete and total control over the style of a hypertext document. The only way this can be illustrated in a way that gets people excited is by demonstrating what it can truly be, once the reins are placed in the hands of those able to create beauty from structure. Designers and coders alike have contributed to the beauty of the web; we can always push it further.</p>
                </div>

                <div className="participation" id="zen-participation" role="article">
                    <h3>Participation</h3>
                    <p>Strong visual design has always been our focus. You are modifying this page, so strong <abbr title="Cascading Style Sheets">CSS</abbr> skills are necessary too, but the example files are commented well enough that even <abbr title="Cascading Style Sheets">CSS</abbr> novices can use them as starting points. Please see the <a href="http://www.mezzoblue.com/zengarden/resources/" title="A listing of CSS-related resources"><abbr title="Cascading Style Sheets">CSS</abbr> Resource Guide</a> for advanced tutorials and tips on working with <abbr title="Cascading Style Sheets">CSS</abbr>.</p>
                    <p>You may modify the style sheet in any way you wish, but not the <abbr title="HyperText Markup Language">HTML</abbr>. This may seem daunting at first if you&#8217;ve never worked this way before, but follow the listed links to learn more, and use the sample files as a guide.</p>
                    <p>Download the sample <a href="/examples/index" title="This page's source HTML code, not to be modified.">HTML</a> and <a href="/examples/style.css" title="This page's sample CSS, the file you may modify.">CSS</a> to work on a copy locally. Once you have completed your masterpiece (and please, don&#8217;t submit half-finished work) upload your <abbr title="Cascading Style Sheets">CSS</abbr> file to a web server under your control. <a href="http://www.mezzoblue.com/zengarden/submit/" title="Use the contact form to send us your CSS file">Send us a link</a> to an archive of that file and all associated assets, and if we choose to use it we will download it and place it on our server.</p>
                </div>

                <div className="benefits" id="zen-benefits" role="article">
                    <h3>Benefits</h3>
                    <p>Why participate? For recognition, inspiration, and a resource we can all refer to showing people how amazing <abbr title="Cascading Style Sheets">CSS</abbr> really can be. This site serves as equal parts inspiration for those working on the web today, learning tool for those who will be tomorrow, and gallery of future techniques we can all look forward to.</p>
                </div>

                <div className="requirements" id="zen-requirements" role="article">
                    <h3>Requirements</h3>
                    <p>Where possible, we would like to see mostly <abbr title="Cascading Style Sheets, levels 1 and 2">CSS 1 &amp; 2</abbr> usage. <abbr title="Cascading Style Sheets, levels 3 and 4">CSS 3 &amp; 4</abbr> should be limited to widely-supported elements only, or strong fallbacks should be provided. The CSS Zen Garden is about functional, practical <abbr title="Cascading Style Sheets">CSS</abbr> and not the latest bleeding-edge tricks viewable by 2% of the browsing public. The only real requirement we have is that your <abbr title="Cascading Style Sheets">CSS</abbr> validates.</p>
                    <p>Luckily, designing this way shows how well various browsers have implemented <abbr title="Cascading Style Sheets">CSS</abbr> by now. When sticking to the guidelines you should see fairly consistent results across most modern browsers. Due to the sheer number of user agents on the web these days &#8212; especially when you factor in mobile &#8212; pixel-perfect layouts may not be possible across every platform. That&#8217;s okay, but do test in as many as you can. Your design should work in at least IE9+ and the latest Chrome, Firefox, iOS and Android browsers (run by over 90% of the population).</p>
                    <p>We ask that you submit original artwork. Please respect copyright laws. Please keep objectionable material to a minimum, and try to incorporate unique and interesting visual themes to your work. We&#8217;re well past the point of needing another garden-related design.</p>
                    <p>This is a learning exercise as well as a demonstration. You retain full copyright on your graphics (with limited exceptions, see <a href="http://www.mezzoblue.com/zengarden/submit/guidelines/">submission guidelines</a>), but we ask you release your <abbr title="Cascading Style Sheets">CSS</abbr> under a Creative Commons license identical to the <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="View the Zen Garden's license information.">one on this site</a> so that others may learn from your work.</p>
                    <p role="contentinfo">By <a href="http://www.mezzoblue.com/">Dave Shea</a>. Bandwidth graciously donated by <a href="http://www.mediatemple.net/">mediatemple</a>. Now available: <a href="http://www.amazon.com/exec/obidos/ASIN/0321303474/mezzoblue-20/">Zen Garden, the book</a>.</p>
                </div>

                <footer>
                    <a href="http://validator.w3.org/check/referer" title="Check the validity of this site&#8217;s HTML" className="zen-validate-html">HTML</a>
                    <a href="http://jigsaw.w3.org/css-validator/check/referer" title="Check the validity of this site&#8217;s CSS" className="zen-validate-css">CSS</a>
                    <a href="http://creativecommons.org/licenses/by-nc-sa/3.0/" title="View the Creative Commons license of this site: Attribution-NonCommercial-ShareAlike." className="zen-license">CC</a>
                    <a href="http://mezzoblue.com/zengarden/faq/#aaa" title="Read about the accessibility of this site" className="zen-accessibility">A11y</a>
                    <a href="https://github.com/mezzoblue/csszengarden.com" title="Fork this site on Github" className="zen-github">GH</a>
                </footer>

            </div>

            <aside className="sidebar">
                <div className="wrapper">
                    <div className="design-selection" id="design-selection">
                        <h3 className="select">Select a Design:</h3>
                        <nav>
                            <ul>
                                <li>
                                    <a href="/221/" className="design-name">Mid Century Modern</a> by <a href="http://andrewlohman.com/" className="designer-name">Andrew Lohman</a>
                                </li>
                                <li>
                                    <a href="/220/" className="design-name">Garments</a> by	<a href="http://danielmall.com/" className="designer-name">Dan Mall</a>
                                </li>
                                <li>
                                    <a href="/219/" className="design-name">Steel</a> by <a href="http://steffen-knoeller.de" className="designer-name">Steffen Knoeller</a>
                                </li>
                                <li>
                                    <a href="/218/" className="design-name">Apothecary</a> by <a href="http://trentwalton.com" className="designer-name">Trent Walton</a>
                                </li>
                                <li>
                                    <a href="/217/" className="design-name">Screen Filler</a> by <a href="http://elliotjaystocks.com/" className="designer-name">Elliot Jay Stocks</a>
                                </li>
                                <li>
                                    <a href="/216/" className="design-name">Fountain Kiss</a> by <a href="http://jeremycarlson.com" className="designer-name">Jeremy Carlson</a>
                                </li>
                                <li>
                                    <a href="/215/" className="design-name">A Robot Named Jimmy</a> by <a href="http://meltmedia.com/" className="designer-name">meltmedia</a>
                                </li>
                                <li>
                                    <a href="/214/" className="design-name">Verde Moderna</a> by <a href="http://www.mezzoblue.com/" className="designer-name">Dave Shea</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="design-archives" id="design-archives">
                        <h3 className="archives">Archives:</h3>
                        <nav>
                            <ul>
                                <li className="next">
                                    <a href="/lucky">I'm feeling Lucky <span className="indicator">&rsaquo;</span></a>
                                </li>
                                <li className="viewall">
                                    <a href="/all" title="View every submission to the Zen Garden.">View All Designs</a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="zen-resources" id="zen-resources">
                        <h3 className="resources">Resources:</h3>
                        <ul>
                            <li className="view-css">
                                <a href="style.css" title="View the source CSS file of the currently-viewed design.">View This Design&#8217;s <abbr title="Cascading Style Sheets">CSS</abbr></a>
                            </li>
                            <li className="css-resources">
                                <a href="http://www.mezzoblue.com/zengarden/resources/" title="Links to great sites with information on using CSS."><abbr title="Cascading Style Sheets">CSS</abbr> Resources </a>
                            </li>
                            <li className="zen-faq">
                                <a href="http://www.mezzoblue.com/zengarden/faq/" title="A list of Frequently Asked Questions about the Zen Garden."><abbr title="Frequently Asked Questions">FAQ</abbr></a>
                            </li>
                            <li className="zen-submit">
                                <a href="http://www.mezzoblue.com/zengarden/submit/" title="Send in your own CSS file.">Submit a Design</a>
                            </li>
                            <li className="zen-translations">
                                <a href="http://www.mezzoblue.com/zengarden/translations/" title="View translated versions of this page.">Translations</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    )
}