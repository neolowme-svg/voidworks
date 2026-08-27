"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  ["/", "Home"], ["/diensten", "Diensten"], ["/prijzen", "Prijzen"],
  ["/hosting", "Hosting"], ["/onderhoud", "Onderhoud"], ["/contact", "Contact"],
] as const;

export default function Navbar(){
  const path=usePathname(); const [open,setOpen]=useState(false);
  return <div className="navWrap"><div className="container"><nav className="nav" aria-label="Hoofdnavigatie">
    <Link className="brand" href="/" onClick={()=>setOpen(false)}><img src="/logo.svg" alt="" /><span>VOIDWORKS</span></Link>
    <div className={`navLinks ${open?"open":""}`}>{items.map(([href,label])=><Link key={href} href={href} className={path===href?"active":""} onClick={()=>setOpen(false)}>{label}</Link>)}</div>
    <div className="navActions"><Link className="button secondary" data-magnetic="true" href="/login">Login</Link><Link className="button primary" data-magnetic="true" href="/contact">Start project <span className="arrow">↗</span></Link><button type="button" className={`menuButton ${open?"open":""}`} aria-expanded={open} aria-label="Menu" onClick={()=>setOpen(v=>!v)}><span className="menuIcon"><i/><i/></span></button></div>
  </nav></div></div>
}
