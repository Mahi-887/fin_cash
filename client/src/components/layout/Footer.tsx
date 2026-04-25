export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-3 px-6 text-center text-xs text-gray-400">
      © {new Date().getFullYear()} FinVerse AI — All rights reserved
    </footer>
  );
}
