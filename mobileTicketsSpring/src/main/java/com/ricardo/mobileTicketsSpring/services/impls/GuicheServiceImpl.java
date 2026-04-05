package com.ricardo.mobileTicketsSpring.services.impls;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ricardo.mobileTicketsSpring.dtos.GuicheDto;
import com.ricardo.mobileTicketsSpring.models.GuicheModel;
import com.ricardo.mobileTicketsSpring.repositorys.GuicheRepository;
import com.ricardo.mobileTicketsSpring.services.interfaces.GuicheServiceInterface;

@Service
public class GuicheServiceImpl implements GuicheServiceInterface {

  @Autowired
  GuicheRepository guicheRepository;

  private GuicheDto toDto(GuicheModel e) {
    return new GuicheDto(
        e.getId(),
        e.getNome(),
        e.isAtivo());
  }

  private GuicheModel toEntity(GuicheDto d) {
    return new GuicheModel(
        d.getNome(),
        d.isAtivo());

  }

  @Override
  public GuicheDto salvar(GuicheDto guicheDto) {
    if (guicheRepository.existsByNome(guicheDto.getNome())) {
      throw new RuntimeException("Nome ja existe");
    }
    GuicheModel salvo = guicheRepository.save(toEntity(guicheDto));
    return toDto(salvo);
  }

  @Override
  public GuicheDto editarPorId(GuicheDto guicheDto, UUID id) {
    GuicheModel guicheModel = guicheRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Guiche não encontrado!"));

    guicheModel.setNome(guicheDto.getNome());
    guicheModel.setAtivo(guicheDto.isAtivo());

    return toDto(guicheRepository.save(guicheModel));
  }

  @Override
  public GuicheDto pesquisarPorId(UUID id) {
    return guicheRepository.findById(id).map(this::toDto)
        .orElseThrow(() -> new RuntimeException("Guiche não encontrado"));
  }

  @Override
  public List<GuicheDto> pesquisarPorNome(String nome) {
    return guicheRepository.findByNomeContaining(nome).stream().map(this::toDto).collect(Collectors.toList());
  }

  @Override
  public List<GuicheDto> listar() {
    return guicheRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
  }

  @Override
  public void deletarPorId(UUID id) {
    GuicheModel guicheModel = guicheRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Guiche não encontrado!"));
    guicheRepository.delete(guicheModel);
  }

  @Override
  public Map<String, GuicheDto> mudarStatus(UUID id) {
    GuicheModel guicheModel = guicheRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Guiche não encontrado"));

    GuicheDto antes = toDto(guicheModel);
    guicheModel.setAtivo(!guicheModel.isAtivo());
    GuicheModel salvo = guicheRepository.save(guicheModel);
    GuicheDto depois = toDto(salvo);

    Map<String, GuicheDto> resposta = new HashMap<>();

    resposta.put("antes: ", antes);
    resposta.put("atualizado: ", depois);

    return resposta;
  }

}
