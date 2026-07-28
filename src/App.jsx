import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Componentes
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Páginas
import Home from "./pages/Home/Home";
import CadernoSegredos from "./pages/CadernoSegredos/CadernoSegredos";
import SegredosArmazenados from "./pages/SegredosArmazenados/SegredosArmazenados";
import GeradorChaves from "./pages/GeradorChaves/GeradorChaves";
import Sobre from "./pages/Sobre/Sobre";

export default function App() {
  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caderno" element={<CadernoSegredos />} />
          <Route path="/armazenados" element={<SegredosArmazenados />} />
          <Route path="/gerador" element={<GeradorChaves />} />
          <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </main>

      <Footer />

      {/* Configuração global das notificações toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}