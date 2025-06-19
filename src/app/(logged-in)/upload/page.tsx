import UploadForm from "@/components/upload/uploadForm";
import UploadHeader from "@/components/upload/uploadHeader";
import  {GetUserUploadLimit} from "@/lib/user";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

const UploadPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.userId) {
    return redirect("/auth/sign-in");
  }
  const {userId, email} = currentUser;
  const {hasReachedDailyLimit, hasReachedMonthlyLimit} = await GetUserUploadLimit(userId, email);
  const hasReachedLimit = hasReachedDailyLimit || hasReachedMonthlyLimit;
  if(hasReachedLimit) redirect("/dashboard");
  return (
    <section className="min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
           <div className="flex flex-col items-center justify-center gap-6 text-center">
            <UploadHeader />
            <UploadForm />
           </div>
        </div>
    </section>
  );
}

export default UploadPage;