using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IPrediccionRepository
    {
        Task<IEnumerable> GetPredicciones();
        Task<IEnumerable<Prediccion>> GetPrediccionesAsync(int year);
        Task<Prediccion> Insertar(Prediccion prediccion);
    }
}