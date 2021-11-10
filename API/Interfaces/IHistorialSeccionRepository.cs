using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IHistorialSeccionRepository
    {
        Task<IEnumerable<Historial_Seccion>> GetChart1bySeccion(string seccion);
        Task<IEnumerable<Historial_Seccion>> GetChart1byGrado(string grado);
        Task<IEnumerable<Historial_Seccion>> GetChart1Async();
    }
}