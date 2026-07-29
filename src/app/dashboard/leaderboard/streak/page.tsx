import { redirect } from "next/navigation";

export default function LeaderboardStreakRedirectPage() {
  redirect("/dashboard/streak");
}
