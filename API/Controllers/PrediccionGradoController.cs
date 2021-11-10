using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PrediccionGradoController : APIBaseController
    {
        private readonly IPrediccionGradoRepository _predicciongradoRepository;
        public PrediccionGradoController(IPrediccionGradoRepository predicciongradoRepository)
        {
            _predicciongradoRepository = predicciongradoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PrediccionSeccion>> GetChartInfo()
        {
            var prediccion_grado = await _predicciongradoRepository.GetCharInfoAsync();

            return Ok(prediccion_grado);
        }
    }
}