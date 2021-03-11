using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MatriculaRepository : IMatriculaRepository
    {
        private readonly DataContext context;

        public MatriculaRepository(DataContext context){
            this.context = context;
        }

        public async Task<IEnumerable<Matricula>> GetMatriculasAsync()
        {
            return await context.tb_matricula.ToListAsync();
        }

        public async Task<Matricula> Insertar(Matricula matricula)
        {
            context.tb_matricula.Add(matricula);
            await context.SaveChangesAsync();
            return matricula;
        }
    }
}