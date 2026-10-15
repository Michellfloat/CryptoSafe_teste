package com.crypto.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.crypto.backend.Model.Anotacao;

@Repository 
public interface AnotacaoRepository extends JpaRepository<Anotacao, UUID>{
    List<Anotacao>findByUsuarioIdOrderByCreatedDesc(UUID userId);
}
