import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
   const session = await getServerSession();
    if(!session){
      redirect(`/login?callbackUrl=/settings`)
    }
  return (
    <div>
      Setting Page
    </div>
  );
}