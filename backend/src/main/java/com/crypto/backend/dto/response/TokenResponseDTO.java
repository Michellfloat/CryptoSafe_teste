package com.crypto.backend.dto.response;

public record TokenResponseDTO(
    String token,
    String type,
    Long expiresIn
) {
    public TokenResponseDTO(String token, Long expiresIn){
        this(token, "Bearer", expiresIn);
    }
}
