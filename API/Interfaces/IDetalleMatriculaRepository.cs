using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IDetalleMatriculaRepository
    {
        Task<DetalleMatricula> Insertar(DetalleMatricula detalleMatricula);
        Task<DetalleMatricula> GetDetMatriculaBtIdMatricula(short id_matricula);
    }
}