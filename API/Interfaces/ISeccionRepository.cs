using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface ISeccionRepository

    {
        Task<bool> SeccionExist(SeccionDTO secciondto);
        Task<IEnumerable<Seccion>> GetSeccionesAsync();
        Task<Seccion> Insertar(Seccion seccion);
        Task<Seccion> GetSeccionesByIdAsync(short id_seccion);
        Task<Seccion> GetSeccionByDetailAsync(string nivel, string grado, string seccion, short anio);
    }
}