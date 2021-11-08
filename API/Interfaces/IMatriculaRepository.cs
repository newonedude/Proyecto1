using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface IMatriculaRepository
    {
        Task<bool> MatriculaExist(MatriculaDTO matriculadto);
        Task<Matricula> GetMatriculaById(short id_matricula);
        Task<IEnumerable<Matricula>> GetMatriculasAsync();
        Task<Matricula> Insertar(Matricula matricula);
        Task<Matricula> GetMatriculaByIdEstudianteAsync(short id_estudiante);
        Task<Matricula> GetMatriculaByDNI(string dni);
        Task<Matricula> Update(Matricula matricula);
        Task<string> Autorizar(short id_matricula);
        Task<IEnumerable<Matricula>> GetMatriculasByDNI(string dni);
        Task<IEnumerable> GetMatriculasTable();
    }
}