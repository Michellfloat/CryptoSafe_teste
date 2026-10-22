package com.crypto.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public record AnotacaoCreateDTO(
    @NotBlank(message = "O conteúdo criptografado não pode estar vazio.")
    String conteudoCifrado,

    String iv
) {

}
