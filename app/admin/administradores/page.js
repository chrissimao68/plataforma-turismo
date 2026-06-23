import AdministradoresForm from "@/components/AdministradoresForm";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdministradoresPage() {
  return (
    <main className="w-full">
      <div className="mx-auto w-[90%] py-10">
        <AdministradoresForm />
      </div>
    </main>
  );
}