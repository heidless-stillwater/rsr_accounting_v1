import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40 py-8 bg-background">
      <div className="container max-w-[95%] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} RSR Accounting. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
          Website: <Link href="http://www.rsraccounting.co.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">www.rsraccounting.co.uk</Link>
        </p>
      </div>
    </footer>
  );
}
