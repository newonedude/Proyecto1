using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;

namespace API.Interfaces
{
    public interface INotaRepository
    {
        Task<IEnumerable<Nota>> GetNotasAsync();
        Task<Nota> Insertar(Nota nota);
        Task<IEnumerable> GetCalificaciones();
        Task<Nota> Update(Nota nota);
        Task<Nota> GetNotaByDNI(short idmatricula);
    }
}