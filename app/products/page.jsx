import { redirect } from "next/navigation";

export default function Page() {
  redirect("/collections");
  return null;
}