package com.ricardo.mobileTicketsSpring.models;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "TB_Guiche")
public class GuicheModel {

  @Id
  @GeneratedValue
  @Column(columnDefinition = "BINARY(16)")
  private UUID id;

  @Column(nullable = false)
  private String nome;

  @Column(nullable = false)
  private boolean ativo = true;

  public GuicheModel(String nome, boolean ativo) {
    this.nome = nome;
    this.ativo = ativo;
  }

}
