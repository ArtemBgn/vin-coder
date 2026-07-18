import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import VariablesPage from "./pages/VariablesPage.jsx";
import VariableDetailPage from "./pages/VariableDetailPage.jsx";

// Внутрішні стилі для швидкого налаштування без створення додаткових файлів
const headerStyle = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const navContainerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 16px",
  height: "60px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle = {
  fontSize: "18px",
  fontWeight: "800",
  color: "#1a202c",
  letterSpacing: "-0.5px",
};

const navListStyle = {
  display: "flex",
  gap: "20px",
  listStyle: "none",
};

const footerStyle = {
  textAlign: "center",
  padding: "24px 16px",
  marginTop: "48px",
  borderTop: "1px solid #e2e8f0",
  fontSize: "14px",
  color: "#718096",
};

export default function App() {
  return (
    <BrowserRouter basename="/vin-coder">
      {/* Семантична шапка сайту */}
      <header style={headerStyle}>
        <nav style={navContainerStyle} aria-label="Головна навігація">
          <div style={logoStyle}>🚗 VIN Decoder</div>

          <ul style={navListStyle}>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  fontWeight: "600",
                  fontSize: "15px",
                  color: isActive ? "#0066cc" : "#4a5568",
                  borderBottom: isActive
                    ? "2px solid #0066cc"
                    : "2px solid transparent",
                  paddingBottom: "4px",
                  transition: "all 0.2s",
                })}
              >
                Головна
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/variables"
                style={({ isActive }) => ({
                  fontWeight: "600",
                  fontSize: "15px",
                  color: isActive ? "#0066cc" : "#4a5568",
                  borderBottom: isActive
                    ? "2px solid #0066cc"
                    : "2px solid transparent",
                  paddingBottom: "4px",
                  transition: "all 0.2s",
                })}
              >
                Специфікації
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main style={{ minHeight: "calc(100vh - 170px)" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/variables" element={<VariablesPage />} />
          <Route path="/variables/:id" element={<VariableDetailPage />} />
        </Routes>
      </main>
      <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} VIN Decoder App.</p>
      </footer>
    </BrowserRouter>
  );
}
