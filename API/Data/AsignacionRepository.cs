using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using API.DTO;

namespace API.Data
{
    public class AsignacionRepository:IAsignacionRepository
    {
        private readonly DataContext context;

        public AsignacionRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Asignacion>> GetAsignacionAsync()
        {
            return await context.tb_asignacion_docente.ToListAsync();
        }

        public async Task<Asignacion> GetAsignacionByDetailAsync(short id_seccion, short anio, Boolean estado, short id_curso)
        {
            return await context.tb_asignacion_docente.Where(r =>
                r.id_curso == id_curso && r.anio == anio && r.id_seccion == id_seccion && r.estado == estado
            ).FirstOrDefaultAsync<Asignacion>();
        }

        public async Task<Asignacion> Insertar(Asignacion asignacion)
        {
            context.tb_asignacion_docente.Add(asignacion);
            await context.SaveChangesAsync();
            return asignacion;
        }

        public async Task<bool> AsignacionExist(AsignacionDTO asignacion)
        {
            return await context.tb_asignacion_docente.AnyAsync(x =>
            x.id_docente == asignacion.id_docente
            && x.id_seccion == asignacion.id_seccion
            && x.id_curso == asignacion.id_curso
            && x.anio == asignacion.anio);
        }
    }
}