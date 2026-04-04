package com.ricardo.mobileTicketsSpring.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ricardo.mobileTicketsSpring.dtos.GuicheDto;
import com.ricardo.mobileTicketsSpring.services.impls.GuicheServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/guiches")
public class GuicheController {

  @Autowired
  private GuicheServiceImpl guicheServiceImpl;

  @PostMapping()
  public ResponseEntity<?> registrar(@RequestBody @Valid GuicheDto guicheDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
    }
    GuicheDto guicheSalvo = guicheServiceImpl.salvar(guicheDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(guicheSalvo);
  }


  @PutMapping("/editar-id/{id}")
  public ResponseEntity<?> editar(@RequestBody @Valid GuicheDto guicheDto, BindingResult bindingResult, @PathVariable UUID id) {
    if (bindingResult.hasErrors()) {
      return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
    }
    GuicheDto guicheEditado = guicheServiceImpl.editarPorId(guicheDto, id);
    return ResponseEntity.status(HttpStatus.OK).body(guicheEditado);
  }


  @GetMapping("/pesquisar-id/{id}")
  public ResponseEntity<?> pesquisarId(@PathVariable UUID id){
    GuicheDto resultado = guicheServiceImpl.pesquisarPorId(id);
    return ResponseEntity.ok().body(resultado);
  }


  @GetMapping("/pesquisar-nome/{nome}")
  public ResponseEntity<List<?>> buscarNome (@PathVariable String nome){
    List<GuicheDto> listaAproximada = guicheServiceImpl.pesquisarPorNome(nome);
    return ResponseEntity.ok().body(listaAproximada);
  }


  @GetMapping
  public ResponseEntity<List<?>> listar(){
    List<GuicheDto> lista = guicheServiceImpl.listar();
    return ResponseEntity.ok().body(lista);
  }


  @DeleteMapping("/deletar-id/{id}")
  public ResponseEntity<?> deletar (@PathVariable UUID id){
    guicheServiceImpl.deletarPorId(id);
    return ResponseEntity.noContent().build();
  }

}
