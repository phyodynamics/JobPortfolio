import Link from "next/link";
import Loader from "@/components/ui/loader";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
      <Loader
        title="404 — Page Not Found"
        subtitle="The page you're looking for doesn't exist"
        size="md"
      />
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
