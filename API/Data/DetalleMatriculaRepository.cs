using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DetalleMatriculaRepository : IDetalleMatriculaRepository
    {
        private readonly DataContext context;
        public DetalleMatriculaRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<DetalleMatricula> Insertar(DetalleMatricula detalleMatricula)
        {
            context.tb_detalle_matricula.Add(detalleMatricula);
            await context.SaveChangesAsync();
            return detalleMatricula;
        }

        public async Task<DetalleMatricula> GetDetMatriculaBtIdMatricula(short id_matricula)
        {
            return await context.tb_detalle_matricula.Where(r => r.id_matricula == id_matricula)
            .FirstOrDefaultAsync<DetalleMatricula>();
        }
    }
}