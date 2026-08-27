import Link from "next/link";
export default function Footer(){return <footer><div className="container footerGrid"><span>© {new Date().getFullYear()} Voidworks. Alle rechten voorbehouden.</span><div className="footerLinks"><Link href="/privacy">Privacy</Link><Link href="/voorwaarden">Voorwaarden</Link><Link href="/contact">Contact</Link></div></div></footer>}
