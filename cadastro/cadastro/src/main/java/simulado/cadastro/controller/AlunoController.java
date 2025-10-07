package simulado.cadastro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simulado.cadastro.dto.AlunoDTO;
import simulado.cadastro.model.Aluno;
import simulado.cadastro.service.AlunoService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "http://localhost:5500")
public class AlunoController {

    @Autowired
    private AlunoService service;

    @PostMapping
    public ResponseEntity<AlunoDTO> create (@RequestBody AlunoDTO alunoDTO){
        AlunoDTO alunoDto = service.saveDto(alunoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(alunoDto);
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDTO> getById(@PathVariable Long id){
        Optional<AlunoDTO> alunoDTO = service.getById(id);
        return alunoDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDTO> update(@PathVariable Long id, @RequestBody AlunoDTO alunoDTO){
        Optional<AlunoDTO> alunoDTOOptional = service.updateAluno(id, alunoDTO);
        return alunoDTOOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        if(service.delete(id)){
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }

}
