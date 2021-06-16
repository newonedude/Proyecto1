using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IMatriculaRepository
    {
        Task<Matricula> GetMatriculaById(short id_matricula);
        Task<IEnumerable<Matricula>> GetMatriculasAsync();
        Task<Matricula> Insertar(Matricula matricula);
        Task<Matricula> GetMatriculaByIdEstudianteAsync(short id_estudiante);
        Task<Matricula> GetMatriculaByDNI(string dni);
        Task<Matricula> Update(Matricula matricula);
    }
}