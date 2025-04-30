export default function MangaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="container w-full h-full">
        {children}
      </div>
    </section>
  );
}
