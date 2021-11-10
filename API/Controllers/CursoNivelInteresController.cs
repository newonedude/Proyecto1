using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CursoNivelInteresController : APIBaseController
    {
        private readonly ICursoNivelInteresRepository _cursonivelinteresRepository;
        public CursoNivelInteresController(ICursoNivelInteresRepository cursonivelinteresRepository)
        {
            _cursonivelinteresRepository = cursonivelinteresRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CursoNivelInteres>> GetChartInfo()
        {
            var curso_nivelinteres = await _cursonivelinteresRepository.GetCharInfoAsync();

            return Ok(curso_nivelinteres);
        }
    }
}