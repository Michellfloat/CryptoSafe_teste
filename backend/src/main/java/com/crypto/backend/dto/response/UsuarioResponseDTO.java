package com.crypto.backend.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record UsuarioResponseDTO(
    UUID id,
    String email,
    LocalDateTime createdAt
) {

}
