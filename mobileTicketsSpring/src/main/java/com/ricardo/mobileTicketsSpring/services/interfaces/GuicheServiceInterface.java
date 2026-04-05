package com.ricardo.mobileTicketsSpring.services.interfaces;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.ricardo.mobileTicketsSpring.dtos.GuicheDto;

public interface GuicheServiceInterface {

  GuicheDto salvar(GuicheDto guicheDto);

  GuicheDto editarPorId(GuicheDto guicheDto, UUID id);

  GuicheDto pesquisarPorId(UUID id);

  List<GuicheDto> pesquisarPorNome(String nome);

  List<GuicheDto> listar();

  void deletarPorId(UUID id);

  Map<String, GuicheDto> mudarStatus(UUID id);

}
