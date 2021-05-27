
import Fabric from './fabric'
import Link from './link'
import Enso from './icons/Enso'
import Slack from './icons/Slack'
import Vercel from './icons/Vercel'
import OcticonGithub from './icons/OcticonGithub'


export default function Footer () {
    return (
        <Fabric className="footer" clearfix>
            <Fabric className="footer__navigators" clearfix>
                <Fabric className="footer__navigator footer__navigator-links">
                    <Fabric clearfix className="footer__navigator-link">
                        <Link target="_blank" href="/about" className="footer__navigator-link--anchor">About</Link>
                    </Fabric>
                    <Fabric clearfix className="footer__navigator-link">
                        <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS" className="footer__navigator-link--anchor">Learn CSS Development</Link>
                    </Fabric>
                    <Fabric clearfix className="footer__navigator-link">
                        <Link target="_blank" href="/submit" title="Send in your own CSS file." className="footer__navigator-link--anchor">Submit a Design</Link>
                    </Fabric>
                    <Fabric clearfix className="footer__navigator-link">
                        Contact Us
                        <Link className="footer__navigator-link-icon" href="https://github.com/css-zen/garden"><OcticonGithub /></Link>
                        <Link className="footer__navigator-link-icon" href="https://join.slack.com/t/csszen/shared_invite/zt-qzopmgzo-F15aU9C0sTYnO13_qc4ZRg"><Slack /></Link>
                    </Fabric>
                </Fabric>
            </Fabric>
            <Fabric grow />
            <Fabric className="footer__copyright" clearfix verticle>
                <Enso className="footer__logo" />
                <Fabric clearfix className="footer__license">© 2021 CSS-ZEN</Fabric>
                <Fabric clearfix className="footer-support">
                    <span>Hosted with</span>
                    <span className="footer-support__heart">&hearts;</span>
                    <span>by</span>
                    <Link href="https://vercel.com/"><Vercel className="footer-support__vercel" /></Link>
                </Fabric>
            </Fabric>
        </Fabric>
    )
}
