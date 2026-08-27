"use client";
import { useEffect, useRef, useState } from "react";
export type SelectOption={value:string;label:string};
export default function CustomSelect({name,options,value,onChange,label}:{name:string;options:SelectOption[];value:string;onChange:(value:string)=>void;label:string}){
  const [open,setOpen]=useState(false);const [focus,setFocus]=useState(0);const root=useRef<HTMLDivElement>(null);const current=Math.max(0,options.findIndex(o=>o.value===value));
  useEffect(()=>{const close=(e:MouseEvent)=>{if(root.current&&!root.current.contains(e.target as Node))setOpen(false)};document.addEventListener("mousedown",close);return()=>document.removeEventListener("mousedown",close)},[]);
  const choose=(i:number)=>{onChange(options[i].value);setFocus(i);setOpen(false)};
  return <div className={`select ${open?"open":""}`} ref={root}>
    <input type="hidden" name={name} value={value}/>
    <button type="button" className="selectButton" aria-haspopup="listbox" aria-expanded={open} aria-label={label} onClick={()=>{setOpen(v=>!v);setFocus(current)}} onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();setOpen(true);setFocus(i=>Math.min(options.length-1,i+1))}if(e.key==="ArrowUp"){e.preventDefault();setOpen(true);setFocus(i=>Math.max(0,i-1))}if(e.key==="Enter"&&open){e.preventDefault();choose(focus)}if(e.key==="Escape")setOpen(false)}}>{options[current]?.label}<svg className="selectChevron" viewBox="0 0 20 20" fill="none"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
    <div className="selectMenu" role="listbox" aria-label={label}>{options.map((o,i)=><button type="button" role="option" aria-selected={o.value===value} className={`selectOption ${i===focus?"active":""} ${o.value===value?"selected":""}`} key={o.value} onMouseEnter={()=>setFocus(i)} onClick={()=>choose(i)}><span>{o.label}</span><span className="selectCheck">✓</span></button>)}</div>
  </div>
}
