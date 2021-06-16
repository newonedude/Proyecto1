using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AsesoriaRepository:IAsesoriaRepository
    {
        private readonly DataContext context;

        public AsesoriaRepository(DataContext context){
            this.context = context;
        }

        public async Task<IEnumerable<Asesoria>> GetAsesoriasAsync()
        {
            return await context.tb_asesoria.ToListAsync();
        }

        public async Task<Asesoria> Insertar(Asesoria asesoria)
        {
            context.tb_asesoria.Add(asesoria);
            await context.SaveChangesAsync();
            return asesoria;
        }
    }
}