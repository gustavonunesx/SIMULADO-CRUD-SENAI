package simulado.cadastro.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simulado.cadastro.dto.AlunoDTO;
import simulado.cadastro.model.Aluno;
import simulado.cadastro.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository repository;

    public Aluno fromDTO(AlunoDTO alunoDTO){
        Aluno aluno = new Aluno();
        aluno.setNome(alunoDTO.getNome());
        aluno.setCpf(alunoDTO.getCpf());
        return aluno;
    }

    public AlunoDTO toDTO(Aluno aluno){
        AlunoDTO alunoDTO = new AlunoDTO();
        alunoDTO.setNome(aluno.getNome());
        alunoDTO.setCpf(aluno.getCpf());
        return alunoDTO;
    }

    public AlunoDTO saveDto(AlunoDTO alunoDTO){
        Aluno aluno = this.fromDTO(alunoDTO);
        Aluno alunoBd = repository.save(aluno);
        return this.toDTO(alunoBd);
    }

    public List<Aluno> getAll(){
        return repository.findAll();
    }

    public Optional<AlunoDTO> getById(Long id){
        Optional<Aluno> optionalAluno = repository.findById(id);
        if (optionalAluno.isPresent()){
            return Optional.of(this.toDTO(optionalAluno.get()));
        }else{
            return Optional.empty();
        }
    }

    public Optional<AlunoDTO> updateAluno (Long id, AlunoDTO alunoDTO){
        Optional<Aluno> optionalAluno = repository.findById(id);
        if (optionalAluno.isPresent()){
            Aluno aluno = optionalAluno.get();
            aluno.setNome(alunoDTO.getNome());
            aluno.setCpf(alunoDTO.getCpf());

            Aluno alunoUpdate = repository.save(aluno);
            return Optional.of(this.toDTO(alunoUpdate));
        }else{
            return Optional.empty();
        }
    }

    public boolean delete(Long id){
        if(repository.existsById(id)){
            repository.deleteById(id);
            return true;
        }else{
            return false;
        }
    }
}
