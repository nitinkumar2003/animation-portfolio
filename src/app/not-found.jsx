import Link from "next/link";

const NotFound = () => (
  <main className="nkos-route-message">
    <span>404</span>
    <h1>File not found</h1>
    <p>This route is not mounted in Nitin OS.</p>
    <Link href="/">Return to workstation</Link>
  </main>
);

export default NotFound;
