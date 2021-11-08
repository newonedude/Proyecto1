using System.Collections;
using System.Threading.Tasks;
using API.Interfaces;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using API.Entities;

namespace API.Data
{
    public class PrediccionRepository : IPrediccionRepository
    {
        private readonly DataContext context;
        public PrediccionRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable> GetPredicciones()
        {
            var result = from a in context.tb_usuario
                         join b in context.tb_estudiante on a.id_usuario equals b.id_usuario
                         join c in context.tb_matricula on b.id_estudiante equals c.id_estudiante
                         join d in context.tb_detalle_matricula on c.id_matricula equals d.id_matricula
                         join e in context.tb_notas on new { d.id_matricula, d.id_asignacion } equals new { e.id_matricula, e.id_asignacion }
                         join f in context.tb_asignacion_docente on d.id_asignacion equals f.id_asignacion
                         join g in context.tb_seccion on f.id_seccion equals g.id_seccion
                         join h in context.tb_curso on f.id_curso equals h.id_curso
                         join i in context.tb_predicciones on new { d.id_matricula, d.id_asignacion } equals new { i.id_matricula, i.id_asignacion }
                         select new
                         {
                             a.dni,
                             nombre = a.nombre + " " + a.ape_paterno + " " + a.ape_materno,
                             seccion = g.grado+" "+g.seccion+" "+g.nivel,
                             anio = g.anio,
                             p1 = e.p1,
                             p2 = e.p2,
                             p3 = e.p3,
                             cf = e.cf,
                             resultado = i.horas_estudio
                         };

            return await result.ToListAsync();
        }

        public async Task<IEnumerable<Prediccion>> GetPrediccionesAsync(int year)
        {
            var result = from a in context.tb_predicciones
            where a.fecha_prediccion.Year == year
            select a;

            return await result.ToListAsync();
        }

        public async Task<Prediccion> Insertar(Prediccion prediccion)
        {
            context.tb_predicciones.Add(prediccion);
            await context.SaveChangesAsync();
            return prediccion;
        }
    }
}