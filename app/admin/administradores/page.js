import AdministradoresForm from "@/components/AdministradoresForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdministradoresPage() {
  return (
    <main className="w-full p-8">
      <div className="mx-auto max-w-7xl">
        <AdministradoresForm />
      </div>
    </main>
  );
}