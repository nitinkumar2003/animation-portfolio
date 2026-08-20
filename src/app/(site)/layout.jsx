import "../../styles/site.css";
import SiteNav from "../../component/site/SiteNav";
import SiteFooter from "../../component/site/SiteFooter";
import AskNitinWidget from "../../component/chat/AskNitinWidget";

const SiteLayout = ({ children }) => (
  <div className="nk">
    <a href="#main" className="nk-skip">Skip to content</a>
    <SiteNav />
    <main id="main">{children}</main>
    <SiteFooter />
    <AskNitinWidget />
  </div>
);

export default SiteLayout;
