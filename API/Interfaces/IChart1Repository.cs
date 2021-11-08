using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IChart1Repository
    {
        Task<IEnumerable<Chart1>> GetChart1bySeccion(string seccion);
        Task<IEnumerable<Chart1>> GetChart1byGrado(string grado);
        Task<IEnumerable<Chart1>> GetChart1Async();
    }
}