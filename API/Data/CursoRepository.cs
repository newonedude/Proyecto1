using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CursoRepository:ICursoRepository
    {
        private readonly DataContext context;
        public CursoRepository(DataContext context){
            this.context = context;
        }

        public async Task<Curso> GetCursoByDescriptionAsync(string descripcion)
        {
            return await context.tb_curso.Where(r=> r.descripcion == descripcion)
            .FirstOrDefaultAsync<Curso>();
        }

        public async Task<IEnumerable<Curso>> GetCursosAsync(){
            return await context.tb_curso.ToListAsync();
        }
    }
}