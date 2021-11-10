using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CursoCalMaterialesRepository : ICursoCalMaterialesRepository
    {
        private readonly DataContext context;
        public CursoCalMaterialesRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<CursoCalMateriales>> GetCharInfoAsync()
        {
            var result = from a in context.rp_curso_calmateriales
                         orderby a.anio ascending, a.periodo ascending
                         select a;

            return await result.ToListAsync();
        }
    }
}