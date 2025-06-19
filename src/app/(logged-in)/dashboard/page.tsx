import SummaryCard from "@/components/summaries/summaryCard";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {GetSummaries} from "@/lib/summary";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import EmptySummaryState from "@/components/summaries/emptySummaryState";
import { GetUserUploadLimit } from "@/lib/user";

const DashboardPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.userId) {
        return {
            success: false,
            message: "User not authenticated",
            data: null
        };
    }
    const { userId, email } = currentUser;

    const { hasReachedDailyLimit, hasReachedMonthlyLimit, dailyUploadLimit, monthlyUploadLimit} = await GetUserUploadLimit(userId, email);
    const summaries = await GetSummaries(userId);
    return (
        <main className="min-h-screen">
            <div className="container mx-auto felx flex-col gap-4">
                <div className="px-2 py-12 sm:py-24">
                    <div className="flex gap-4 mb-8 justify-between">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-blue-500 bg-clip-text text-transparent">Your Snap Summaries</h1>
                            <p>Transform your PDFs into concise & crisp insights.</p>
                        </div>
                        {!hasReachedDailyLimit && !hasReachedDailyLimit &&
                            <Button variant={"link"} className="bg-linear-to-r from-green-700 to-green-500 hover:from-green-500 hover:to-green-700 hover:scale-105 font-bold transition-all duration-300">
                                <Link href={"/upload"} className="flex items-center text-white">
                                <Plus className="w-5 h-5 mr-2"/> New Summary
                                </Link>
                            </Button>
                        }
                    </div>
                    {hasReachedDailyLimit && 
                        <div className="mb-6">  
                            <div className="bg-red-100 border border-red-300 rounded-full p-4 text-red-500">
                                <p>
                                    You've reached your daily upload limit of {dailyUploadLimit} on the basic plan.
                                    <Link href={"/#pricing"} className="text-red-500 underline font-medium underline-offset-4 inline-flex items-center">
                                        Upgrade to Pro{' '} <ArrowRight className="w-4 h-4 inline-block"/>
                                    </Link>{' '}
                                    to unlock higher limits and more features.
                                </p>
                            </div>
                        </div>
                    }   

                    {hasReachedMonthlyLimit &&
                        <div className="mb-6">
                            <div className="bg-red-100 border border-red-300 rounded-full p-4 text-red-500">
                                <p>
                                    You've reached your monthly upload limit of {monthlyUploadLimit} on the basic plan.
                                    <Link href={"/#pricing"} className="text-red-500 underline font-medium underline-offset-4 inline-flex items-center">
                                        Upgrade to Pro{' '} <ArrowRight className="w-4 h-4 inline-block"/>
                                    </Link>{' '}
                                    to unlock higher limits and more features.
                                </p>
                            </div>
                        </div>
                    }

                    {summaries.length === 0 ? 
                        <EmptySummaryState /> 
                    :
                        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
                            {summaries.map((summary, index) => (
                                <SummaryCard key={index} summary={summary}/>
                            ))}
                        </div>
                    }   
                </div>
            </div>
        </main>
    )
}

export default DashboardPage;