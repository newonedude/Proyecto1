using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PrediccionSeccionController:APIBaseController
    {
        private readonly IPrediccionSeccionRepository _prediccionseccionRepository;
        public PrediccionSeccionController(IPrediccionSeccionRepository prediccionseccionRepository)
        {
            _prediccionseccionRepository = prediccionseccionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<PrediccionSeccion>> GetChartInfo()
        {
            var prediccion_seccion = await _prediccionseccionRepository.GetCharInfoAsync();

            return Ok(prediccion_seccion);
        }
    }
}