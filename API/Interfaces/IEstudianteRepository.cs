using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IEstudianteRepository
    {
        Task<IEnumerable<Estudiante>> GetEstudiantesAsync();
        Task<Estudiante> GetEstudianteByIdAsync(short id_estudiante);
        void Update(Estudiante estudiante);
        Task<Estudiante> Insertar(Estudiante estudiante);
        Task<Estudiante> GetEstudianteByIdUsuarioAsync(short id_usuario);
    }
}