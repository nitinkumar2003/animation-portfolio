import "../../styles/site.css";
import SiteNav from "../../component/site/SiteNav";
import SiteFooter from "../../component/site/SiteFooter";
import AskNitinWidget from "../../component/chat/AskNitinWidget";
import { PreferencesProvider } from "../../component/site/Preferences";
import SkipLink from "../../component/site/SkipLink";

const SiteLayout = ({ children }) => (
  <PreferencesProvider>
    <div className="nk">
      <SkipLink />
      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
      <AskNitinWidget />
    </div>
  </PreferencesProvider>
);

export default SiteLayout;
