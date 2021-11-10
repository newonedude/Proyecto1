using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CursoNivelInteresRepository : ICursoNivelInteresRepository
    {
        private readonly DataContext context;
        public CursoNivelInteresRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<CursoNivelInteres>> GetCharInfoAsync()
        {
            var result = from a in context.rp_curso_nivelinteres
                         orderby a.anio ascending, a.periodo ascending
                         select a;

            return await result.ToListAsync();
        }
    }
}