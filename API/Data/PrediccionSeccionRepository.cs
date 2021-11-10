using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PrediccionSeccionRepository : IPrediccionSeccionRepository
    {
        private readonly DataContext context;
        public PrediccionSeccionRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<PrediccionSeccion>> GetCharInfoAsync()
        {
            var result = from a in context.rp_prediccion_seccion
                         orderby a.anio ascending, a.grado ascending, a.seccion ascending, a.periodo ascending
                         select a;

            return await result.ToListAsync();
        }
    }
}