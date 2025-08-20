import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function AskPage() {
  const session = await getServerSession();
  if(!session){
    redirect(`/login?callbackUrl=/ask`)
  }

  return (
    <div className="p-8">
      Ask a Question Page
    </div>
  );
}