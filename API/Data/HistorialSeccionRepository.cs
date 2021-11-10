using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HistorialSeccionRepository : IHistorialSeccionRepository
    {
        private readonly DataContext context;
        public HistorialSeccionRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Historial_Seccion>> GetChart1bySeccion(string seccion)
        {
            var result = from a in context.rp_historial_seccion
                         where a.seccion == seccion
                         select a;

            return await result.ToListAsync();
        }

        public async Task<IEnumerable<Historial_Seccion>> GetChart1Async()
        {
            var result = from a in context.rp_historial_seccion
                         orderby a.anio ascending, a.grado ascending, a.seccion ascending
                         select a;

            return await result.ToListAsync();
        }

        public async Task<IEnumerable<Historial_Seccion>> GetChart1byGrado(string grado)
        {
            var result = from a in context.rp_historial_seccion
                         where a.grado == grado
                         select a;

            return await result.ToListAsync();
        }
    }
}