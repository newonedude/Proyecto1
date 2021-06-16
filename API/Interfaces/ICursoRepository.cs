using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ICursoRepository
    {
        Task<IEnumerable<Curso>> GetCursosAsync();
        Task<Curso> GetCursoByDescriptionAsync(string descripcion);
    }
}