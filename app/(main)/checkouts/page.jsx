import { redirect } from "next/navigation";

export default function Page() {
  redirect("/404");
  return null;
}
