using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HistorialSeccionController:APIBaseController
    {
        private readonly IHistorialSeccionRepository _historialseccionRepository;
        public HistorialSeccionController(IHistorialSeccionRepository historialseccionRepository)
        {
            _historialseccionRepository = historialseccionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Historial_Seccion>> GetChart1()
        {
            var historial_seccion = await _historialseccionRepository.GetChart1Async();

            return Ok(historial_seccion);
        }
    }
}