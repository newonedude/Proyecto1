using System.Collections;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Matricula> GetMatriculaById(short id_matricula)
        {
            return await context.tb_matricula.Where(r => r.id_matricula == id_matricula)
            .FirstOrDefaultAsync<Matricula>();
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

        public async Task<Matricula> GetMatriculaByIdEstudianteAsync(short id_estudiante)
        {
            return await context.tb_matricula.Where(r => r.id_estudiante == id_estudiante)
            .FirstOrDefaultAsync<Matricula>();
        }

        public async Task<Matricula> GetMatriculaByDNI(string dni)
        {
            var result = from a in context.tb_usuario
            join b in context.tb_estudiante on a.id_usuario equals b.id_usuario
            join c in context.tb_matricula on b.id_estudiante equals c.id_estudiante
            where a.dni == dni && c.estado == true
            select c;

            return await result.FirstAsync<Matricula>();
        }

        public async Task<Matricula> Update(Matricula matricula)
        {
            context.tb_matricula.Update(matricula);
            await context.SaveChangesAsync();
            return matricula;
        }
    }
}