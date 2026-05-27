import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <main className="container">
        {children}
      </main>
    </div>
  );
}

export default Layout;