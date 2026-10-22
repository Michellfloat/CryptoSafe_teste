package com.crypto.backend.service;

import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crypto.backend.Model.MetadadoChave;
import com.crypto.backend.Model.Usuario;
import com.crypto.backend.dto.request.UsuarioRegisterDTO;
import com.crypto.backend.dto.response.UsuarioResponseDTO;
import com.crypto.backend.exception.BusinessException;
import com.crypto.backend.exception.ResourceNotFoundException;
import com.crypto.backend.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UsuarioResponseDTO registrar(UsuarioRegisterDTO dto){
        if (usuarioRepository.exisexistsByEmail(dto.email())) {
            throw new BusinessException("Este e-mail já está cadastrado no sistema.");
        }

        Usuario usuario = Usuario.builder()
                .email(dto.email())
                .senhaHash(passwordEncoder.encode(dto.senha()))
                .build();

        MetadadoChave metadadoChave = MetadadoChave.builder()
                        .saltDerivacao(dto.saltDerivacao())
                        .algoritmo(dto.algoritmo())
                        .iteracoes(dto.iteracoes())
                        .usuario(usuario)
                        .build();
        
        usuario.setMetadadoChave(metadadoChave);

        Usuario salvo = usuarioRepository.save(usuario);

        return new UsuarioResponseDTO(salvo.getId(), salvo.getEmail(), salvo.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorId(UUID id){
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));

        return new UsuarioResponseDTO(usuario.getId(), usuario.getEmail(), usuario.getCreatedAt());
    }
}
