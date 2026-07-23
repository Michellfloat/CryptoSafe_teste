import { NavLink } from "react-router-dom";

export default function Header() {
    const linkStyle = ({isActive}) => ({
        color: isActive ? '#0070f3' : '#555',
        textDecoration: 'none',
        fontWeight: isActive ? 'bold' : 'normal',
        padding: '8px 12px',
        borderRadius: '6px',
        backgroundColor: isActive ? '#e6f0ff' : 'transparent',
    });

    return (
        <header>
            <div>
                <nav>
                    <NavLink to="/" end style={linkStyle}>Home</NavLink>
                    <NavLink to="/caderno" style={linkStyle}>Caderno de Segredos</NavLink>
                    <NavLink to="/armazenados" style={linkStyle}>Segredos Armazenados</NavLink>
                    <NavLink to="/gerador" style={linkStyle}>Gerador de Chaves</NavLink>
                    <NavLink to="/sobre" style={linkStyle}>Sobre</NavLink>
                </nav>
            </div>
        </header>
    );
}