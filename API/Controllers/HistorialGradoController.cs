using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HistorialGradoController : APIBaseController
    {
        private readonly IHistorialGradoRepository _historialgradoRepository;
        public HistorialGradoController(IHistorialGradoRepository historialgradoRepository)
        {
            _historialgradoRepository = historialgradoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Historial_Grado>> GetChart1()
        {
            var historial_seccion = await _historialgradoRepository.GetCharInfoAsync();

            return Ok(historial_seccion);
        }
    }
}