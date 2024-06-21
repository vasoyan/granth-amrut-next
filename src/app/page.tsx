import HomePage from "@/components/Dashboard/Home";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Granthamrut Dashboard",
  description: "Granthamrut Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <HomePage />
      </DefaultLayout>
    </>
  );
}
