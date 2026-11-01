import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-bg">
      <div className="border-b border-border/60 px-6 py-4">
        <Link href="/" className="text-[14px] text-muted hover:text-text">
          ← Back to Orbit
        </Link>
      </div>
      {children}
    </div>
  );
}
