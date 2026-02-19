import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Loader
        title="Loading..."
        subtitle="Preparing your experience"
        size="lg"
      />
    </div>
  );
}
