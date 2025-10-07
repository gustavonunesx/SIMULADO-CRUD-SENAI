package simulado.cadastro.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTO {

    @NotBlank
    private String nome;

    @Column(unique = true)
    @NotBlank
    private String cpf;
}
