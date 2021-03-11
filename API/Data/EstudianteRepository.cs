using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EstudianteRepository : IEstudianteRepository
    {
        private readonly DataContext context;
        public EstudianteRepository(DataContext context){
            this.context = context;
        }
        public async Task<Estudiante> GetEstudianteByIdAsync(short id_estudiante)
        {
            return await context.tb_estudiante.FindAsync(id_estudiante);
        }

        public async Task<Estudiante> GetEstudianteByIdUsuarioAsync(short id_usuario)
        {
            return await context.tb_estudiante.Where(r => r.id_usuario == id_usuario)
            .FirstOrDefaultAsync<Estudiante>();
        }

        public async Task<IEnumerable<Estudiante>> GetEstudiantesAsync()
        {
            return await context.tb_estudiante.ToListAsync();
        }

        public async Task<Estudiante> Insertar(Estudiante estudiante)
        {
            context.tb_estudiante.Add(estudiante);
            await context.SaveChangesAsync();
            return estudiante;
        }

        public void Update(Estudiante estudiante)
        {
            context.Entry(estudiante).State = EntityState.Modified;
        }
    }
}