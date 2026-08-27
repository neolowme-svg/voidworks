"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function LogoutButton(){const router=useRouter();async function logout(){try{const supabase=createClient();await supabase.auth.signOut();router.push("/login");router.refresh()}catch{router.push("/login")}}return <button className="button secondary" type="button" onClick={logout}>Uitloggen</button>}
