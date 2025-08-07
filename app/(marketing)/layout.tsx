import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-slate-100 dark:bg-slate-900">
      <Navbar />
      <main className="pt-40 pb-20 bg-slate-100 dark:bg-slate-900">
        {children}
      </main>
      <Footer />
    </div>
  );
}
