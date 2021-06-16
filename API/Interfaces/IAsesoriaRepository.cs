using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;

namespace API.Interfaces
{
    public interface IAsesoriaRepository
    {
        Task<IEnumerable<Asesoria>> GetAsesoriasAsync();
        Task<Asesoria> Insertar(Asesoria asesoria);
    }
}