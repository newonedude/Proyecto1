using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISeccionRepository

    {
        Task<IEnumerable<Seccion>> GetSeccionesAsync();
        Task<Seccion> Insertar(Seccion seccion);
        Task<Seccion> GetSeccionesByIdAsync(short id_seccion);
    }
}