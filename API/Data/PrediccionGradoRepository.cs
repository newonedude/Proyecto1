using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PrediccionGradoRepository : IPrediccionGradoRepository
    {
        private readonly DataContext context;
        public PrediccionGradoRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<PrediccionGrado>> GetCharInfoAsync()
        {
            var result = from a in context.rp_prediccion_grado
                         orderby a.anio ascending, a.grado ascending, a.periodo ascending
                         select a;

            return await result.ToListAsync();
        }
    }
}