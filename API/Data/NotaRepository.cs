using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NotaRepository : INotaRepository
    {
        private readonly DataContext context;
        public NotaRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Nota>> GetNotasAsync()
        {
            return await context.tb_notas.ToListAsync();
        }

        public async Task<Nota> Insertar(Nota nota)
        {
            context.tb_notas.Add(nota);
            await context.SaveChangesAsync();
            return nota;
        }

        public async Task<IEnumerable> GetCalificaciones()
        {
            var result = from a in context.tb_usuario
                         join b in context.tb_estudiante on a.id_usuario equals b.id_usuario
                         join c in context.tb_matricula on b.id_estudiante equals c.id_estudiante
                         join d in context.tb_detalle_matricula on c.id_matricula equals d.id_matricula
                         join e in context.tb_notas on new { d.id_matricula, d.id_asignacion } equals new { e.id_matricula, e.id_asignacion }
                         join f in context.tb_asignacion_docente on d.id_asignacion equals f.id_asignacion
                         join g in context.tb_seccion on f.id_seccion equals g.id_seccion
                         join h in context.tb_curso on f.id_curso equals h.id_curso
                         select new
                         {
                             nombre = a.nombre + " " + a.ape_paterno + " " + a.ape_materno,
                             a.dni,
                             nivel = g.nivel,
                             grado = g.grado,
                             seccion = g.seccion,
                             anio = g.anio,
                             curso = h.descripcion,
                             p1 = e.p1,
                             p2 = e.p2,
                             p3 = e.p3,
                             cf = e.cf
                         };
            return await result.ToListAsync();
        }

        public async Task<Nota> Update(Nota nota)
        {
            context.tb_notas.Update(nota);
            await context.SaveChangesAsync();
            return nota;
        }

        public async Task<Nota> GetNotaByDNI(short idmatricula)
        {
            var result = from a in context.tb_matricula
                         join b in context.tb_notas on a.id_matricula equals b.id_matricula
                         where a.id_matricula == idmatricula
                         select b;

            return await result.FirstAsync<Nota>();
        }
    }
}