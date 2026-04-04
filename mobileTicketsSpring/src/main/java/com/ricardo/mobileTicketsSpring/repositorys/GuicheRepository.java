package com.ricardo.mobileTicketsSpring.repositorys;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ricardo.mobileTicketsSpring.models.GuicheModel;
import java.util.List;

public interface GuicheRepository extends JpaRepository<GuicheModel, UUID> {

  Optional<GuicheModel> findByNome(String nome);

  boolean existsByNome(String nome);

  List<GuicheModel> findByNomeContaining(String nome);



}
