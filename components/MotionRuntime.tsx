"use client";
import { useEffect } from "react";
export default function MotionRuntime(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}}),{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    const fine=matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups:(()=>void)[]=[];
    if(fine){
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach(el=>{
        const move=(ev:MouseEvent)=>{const r=el.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;if(el.classList.contains("device")){el.style.setProperty("--rx",`${(-y*4.5).toFixed(2)}deg`);el.style.setProperty("--ry",`${(x*4.5).toFixed(2)}deg`)}else el.style.transform=`perspective(800px) rotateX(${(-y*2.5).toFixed(2)}deg) rotateY(${(x*2.5).toFixed(2)}deg) translateY(-3px)`};
        const leave=()=>{if(el.classList.contains("device")){el.style.setProperty("--rx","0deg");el.style.setProperty("--ry","0deg")}else el.style.transform=""};
        el.addEventListener("mousemove",move);el.addEventListener("mouseleave",leave);cleanups.push(()=>{el.removeEventListener("mousemove",move);el.removeEventListener("mouseleave",leave)});
      });
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(el=>{const move=(ev:MouseEvent)=>{const r=el.getBoundingClientRect();el.style.setProperty("--mx",`${(ev.clientX-r.left-r.width/2)*.08}px`);el.style.setProperty("--my",`${(ev.clientY-r.top-r.height/2)*.08}px`)};const leave=()=>{el.style.setProperty("--mx","0px");el.style.setProperty("--my","0px")};el.addEventListener("mousemove",move);el.addEventListener("mouseleave",leave);cleanups.push(()=>{el.removeEventListener("mousemove",move);el.removeEventListener("mouseleave",leave)})});
    }
    return ()=>{obs.disconnect();cleanups.forEach(fn=>fn())};
  },[]);
  return null;
}
