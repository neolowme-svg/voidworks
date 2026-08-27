import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
export const metadata={title:"Dashboard"};
export default async function Page(){
  let supabase;
  try{supabase=await createClient()}catch{return <main><section className="pageHero"><div className="container"><h1>Supabase is nog <span className="soft">niet gekoppeld.</span></h1><p className="pageLead">Zodra je de environment variables invult, kan dit dashboard gebruikers veilig herkennen.</p></div></section></main>}
  const {data:{user}}=await supabase.auth.getUser();
  if(!user)redirect("/login");
  const [{data:projects},{data:tickets}]=await Promise.all([
    supabase.from("projects").select("id,name,plan,status,site_url,created_at").order("created_at",{ascending:false}),
    supabase.from("support_tickets").select("id,subject,status,priority,created_at").order("created_at",{ascending:false})
  ]);
  const openTickets=(tickets||[]).filter(t=>t.status!=="closed").length;
  return <main><section className="pageHero"><div className="container reveal"><span className="kicker"><span className="kickerDot"/>Dashboard</span><h1>Welkom terug.</h1><p className="pageLead">Je projecten, hosting en support kunnen hier rechtstreeks uit Supabase worden geladen.</p><div className="heroActions"><LogoutButton/></div></div></section><section className="block"><div className="container dashboardGrid"><div className="dashCard"><small>Account</small><strong>{user.email}</strong><p>Ingelogd via Supabase Auth.</p></div><div className="dashCard"><small>Projecten</small><strong>{projects?.length||0} actief</strong><p>{projects?.[0]?.name?`Laatste project: ${projects[0].name}`:"Nog geen project aan dit account gekoppeld."}</p></div><div className="dashCard"><small>Support</small><strong>{openTickets} open</strong><p>{openTickets?"Er staat nog een supportverzoek open.":"Er staan geen open supporttickets."}</p></div></div></section></main>
}
