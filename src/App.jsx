import React from "react";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import CadernoSegredos from "./pages/CadernoSegredos/CadernoSegredos";
import SegredosArmazenados from "./pages/SegredosArmazenados/SegredosArmazenados";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const Home = () => <div><h1>Bem vindo ao CryptoSafe</h1> <p>Seu cofre digital de notas criptografadas.</p></div>;

const Sobre = () => <div><h2>Sobre o CryptoSafe</h2><p>Projeto focado em privacidade, utilizando criptografia AES client-side.</p></div>;

const Gerador = () => <div><h2>Gerador de Chaves Fortes</h2><p>Em breve: gerador customizável de hashes.</p></div>;

export default function App(){
    return(
        <div>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/caderno" element={<CadernoSegredos />}/>
                    <Route path="/armazenados" element={<SegredosArmazenados />}/>
                    <Route path="/gerador" element={<Gerador />}/>
                    <Route path="/sobre" element={<Sobre />}/>
                </Routes>
            </main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}