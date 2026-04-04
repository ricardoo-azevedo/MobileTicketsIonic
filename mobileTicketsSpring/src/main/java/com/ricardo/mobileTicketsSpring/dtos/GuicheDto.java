package com.ricardo.mobileTicketsSpring.dtos;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class GuicheDto {

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private UUID id;

  @NotBlank(message = "Nome é obrigatorio")
  @Size(max = 100, message = "O maximo de caracteres é 100")
  private String nome;

  @NotNull(message = "Status ativo é obrigatorio")
  private boolean ativo = true;

}
