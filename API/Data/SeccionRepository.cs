using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SeccionRepository : ISeccionRepository
    {
        private readonly DataContext context;

        public SeccionRepository(DataContext context)
        {
            this.context = context;

        }

        public async Task<Seccion> GetSeccionByDetailAsync(string nivel, string grado, string seccion, short anio)
        {
            return await context.tb_seccion.Where(r => r.nivel == nivel && r.grado == grado && r.seccion == seccion && r.anio == anio).FirstOrDefaultAsync<Seccion>();
        }

        public async Task<IEnumerable<Seccion>> GetSeccionesAsync()
        {
            return await context.tb_seccion.ToListAsync();
        }

        public async Task<Seccion> GetSeccionesByIdAsync(short id_seccion)
        {
            return await context.tb_seccion.FindAsync(id_seccion);
        }

        public async Task<Seccion> Insertar(Seccion seccion)
        {
            context.tb_seccion.Add(seccion);
            await  context.SaveChangesAsync();
            return seccion;
        }
    }
}