using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;

namespace API.Data
{
    public class DetalleMatriculaRepository : IDetalleMatriculaRepository
    {
        private readonly DataContext context;
        public DetalleMatriculaRepository(DataContext context){
            this.context = context;
        }

        public async Task<DetalleMatricula> Insertar(DetalleMatricula detalleMatricula)
        {
            context.tb_detalle_matricula.Add(detalleMatricula);
            await context.SaveChangesAsync();
            return detalleMatricula;
        }
    }
}