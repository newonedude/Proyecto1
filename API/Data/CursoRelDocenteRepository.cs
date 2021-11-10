using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CursoRelDocenteRepository : ICursoRelDocenteRepository
    {
        private readonly DataContext context;
        public CursoRelDocenteRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<CursoRelDocente>> GetCharInfoAsync()
        {
            var result = from a in context.rp_curso_reldocente
                         orderby a.anio ascending, a.periodo ascending
                         select a;

            return await result.ToListAsync();
        }
    }
}