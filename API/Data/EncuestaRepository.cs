using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class EncuestaRepository:IEncuestaRepository
    {
        private readonly DataContext context;
        public EncuestaRepository(DataContext context){
            this.context = context;
        }

        public async Task<Encuesta> Insertar(Encuesta encuesta)
        {
            context.tb_encuesta.Add(encuesta);
            await context.SaveChangesAsync();
            return encuesta;
        }

        public async Task<Encuesta> GetEncuestaByIdMatriculaAsync(short id_matricula)
        {
            return await context.tb_encuesta.Where(r => r.id_matricula == id_matricula)
            .FirstOrDefaultAsync<Encuesta>();
        }
        public async Task<Encuesta> Update(Encuesta encuesta)
        {
            context.tb_encuesta.Update(encuesta);
            await context.SaveChangesAsync();
            return encuesta;
        }
    }
}