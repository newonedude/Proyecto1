using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IMatriculaRepository
    {
        Task<IEnumerable<Matricula>> GetMatriculasAsync();
        Task<Matricula> Insertar(Matricula matricula);
    }
}