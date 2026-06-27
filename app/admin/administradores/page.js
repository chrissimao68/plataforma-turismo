import AdministradoresForm from "@/components/AdministradoresForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdministradoresPage() {
  return (
    <main className="w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto w-full max-w-7xl">
        <AdministradoresForm />
      </div>
    </main>
  );
}