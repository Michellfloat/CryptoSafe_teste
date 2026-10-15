CREATE TABLE tab_usuarios(
    id UUID PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TABLE tab_anotacoes(
    id UUID PRIMARY KEY,
    conteudo_cifrado TEXT NOT NULL, 
    vetor_inicializacao VARCHAR(100),
    usuario_id UUID NOT NULL,
    created_at TIMESTAMPS NOT NULL,
    CONSTRAINT fk_anotacoes_usuario FOREIGN KEY(usuario_id) tab_usuarios(id) ON DELETE CASCADE
);

CREATE TABLE tab_metadados_chave(
    id UUID PRIMARY KEY,
    salt_derivacao VARCHAR(255) NOT NULL,
    algoritmo_utilizado VARCHAR(50) NOT NULL,
    iteracoes INT NOT NULL,
    usuario_id UUID NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_metadados_usuario FOREIGN KEY (usuario_id) REFERENCES tab_usuarios(id) ON DELETE CASCADE
)