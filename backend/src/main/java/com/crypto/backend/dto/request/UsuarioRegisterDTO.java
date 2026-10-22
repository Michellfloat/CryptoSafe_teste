package com.crypto.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioRegisterDTO(
    @NotBlank(message = "email obrigatório") 
    @Email(message = "email inválido")
    String email,

    @NotBlank(message = "senha obrigatória")
    @Size(min = 6, message = "senha deve ter no mínimo 6 caracteres")
    String senha,

    @NotBlank(message = "o salt de derivação da chave é obrigatório.")
    String saltDerivacao,

    @NotBlank(message = "O algoritmo de criptografia é obrigatório.")
    String algoritmo,

    @NotNull(message = "O número de interações é obrigatório.")
    String iteracoes
) {

}
