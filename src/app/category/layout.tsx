import Footer from "../components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #ccc" }}>
      {children}
      <Footer />
    </div>
  );
}
