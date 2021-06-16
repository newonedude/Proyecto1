using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IEncuestaRepository
    {
        Task<Encuesta> GetEncuestaByIdMatriculaAsync(short id_matricula);
        Task<Encuesta> Insertar(Encuesta encuesta);
        Task<Encuesta> Update(Encuesta encuesta);
    }
}