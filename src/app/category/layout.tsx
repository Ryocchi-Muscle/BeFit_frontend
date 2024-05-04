import Footer from "../components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "20px" }}
     
    >
      {children}
      <Footer />
    </div>
  );
}
