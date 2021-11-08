using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface IAsignacionRepository
    {
        Task<Asignacion> Insertar(Asignacion asignacion);
        Task<bool> AsignacionExist(AsignacionDTO asignacion);
        Task<IEnumerable<Asignacion>> GetAsignacionAsync();
        Task<Asignacion> GetAsignacionByDetailAsync(short id_seccion, short anio, Boolean estado, short id_curso);
    }
}