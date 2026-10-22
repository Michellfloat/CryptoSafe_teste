package com.crypto.backend.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record AnotacaoResponseDTO(
    UUID id,
    String conteudoCifrado,
    String iv,
    LocalDateTime createdAt
) {

}
