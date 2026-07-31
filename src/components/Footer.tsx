export default function Footer() {
  return (
    <footer
      style={{ height: "50px" }}
      className="w-full flex items-center justify-center bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 text-white text-sm font-medium tracking-wide mt-[200px]"
    >
      Taco Hut Enterprises &copy; 2026
    </footer>
  );
}// ...existing code...
      <body className="font-body">
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 px-6 py-6">
            {children}
          </main>
          <Footer />
        </div>
      </body>
// ...existing code...