using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HistorialGradoRepository : IHistorialGradoRepository
    {
        private readonly DataContext context;
        public HistorialGradoRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Historial_Grado>> GetCharInfoAsync()
        {
            var result = from a in context.rp_historial_grado
                         orderby a.anio ascending, a.grado ascending
                         select a;

            return await result.ToListAsync();
        }
    }
}