export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black">
      <header className="w-full">
        <h2 className="text-2xl font-semibold text-center py-5 bg-foreground text-background">
          Accounting
        </h2>
      </header>
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-72 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full flex justify-center items-center gap-6 text-center">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome to my page.
          </h1>
        </div>
        <div className="w-full flex justify-center items-center gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/accounting"
            rel="noopener noreferrer"
          >
            Click to start
          </a>
        </div>
      </main>
    </div>
  );
}
