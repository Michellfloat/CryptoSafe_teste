package com.crypto.backend.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.crypto.backend.Model.Anotacao;
import com.crypto.backend.Model.Usuario;
import com.crypto.backend.dto.request.AnotacaoCreateDTO;
import com.crypto.backend.dto.response.AnotacaoResponseDTO;
import com.crypto.backend.exception.ResourceNotFoundException;
import com.crypto.backend.exception.UnauthorizedException;
import com.crypto.backend.repository.AnotacaoRepository;
import com.crypto.backend.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class AnotacaoService {
    private final AnotacaoRepository anotacaoRepository;

    private final UsuarioRepository usuarioRepository;

    @Transactional 
    public AnotacaoResponseDTO criarAnotação(UUID usuarioId, AnotacaoCreateDTO dto){
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new  ResourceNotFoundException("Usuário não encontrado."));

        Anotacao anotacao = Anotacao.builder()
        .conteudoCifrado(dto.conteudoCifrado())
        .iv(dto.iv())
        .usuario(usuario)
        .build();

        Anotacao salva = anotacaoRepository.save(anotacao);

        return new AnotacaoResponseDTO(
            salva.getId(),
            salva.getConteudoCifrado(),
            salva.getIv(),
            salva.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<AnotacaoResponseDTO> listarPorUsuario(UUID usuarioId){
        if(!usuarioRepository.existsById(usuarioId)){
            throw new ResourceNotFoundException("Usuário não encontrado.");
        }
        
        return anotacaoRepository.findByUsuarioIdOrderByCreatedDesc(usuarioId)
                .stream()
                .map(a -> new AnotacaoResponseDTO(a.getId(), a.getConteudoCifrado(), a.getIv(), a.getCreatedAt()))
                .toList();
    }

    @Transactional 
    public void deletarAnotacao(UUID usuarioId, UUID anotacaoId){
        Anotacao anotacao = anotacaoRepository.findById(anotacaoId).orElseThrow(() -> new ResourceNotFoundException("Segredo/Anotação não encontrada."));

        if (!anotacao.getUsuario().getId().equals(usuarioId)) {
            throw new  UnauthorizedException("Você não tem permissão para excluir este segredo.");
        }

        anotacaoRepository.delete(anotacao);
    }
}
