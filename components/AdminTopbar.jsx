import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 px-8 py-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Gerencie o portal turístico.</p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50"
          >
            <ExternalLink size={16} />
            Ver site
          </Link>

         
        </div>
      </div>
    </header>
  );
}