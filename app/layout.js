import "./globals.css";
import Header from "@/components/Header";
import { StoreProvider } from "@/components/StoreProvider";

export const metadata = {
  title: "Addis Eats | Taste Ethiopia",
  description: "Discover Ethiopian favorites, order freshly prepared meals, and enjoy local flavors with Addis Eats.",
  applicationName: "Addis Eats",
  keywords: ["Ethiopian food", "food ordering", "Addis Ababa", "injera", "doro wot"]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <footer className="site-footer">
            <div className="footer-inner">
              <div><div className="footer-brand">Addis<span>Eats</span></div><p>Local flavors. Heartfelt hospitality.</p></div>
              <div className="footer-right"><span>Made with ❤️ in Ethiopia</span><span>© {new Date().getFullYear()} Addis Eats Demo</span></div>
            </div>
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
