using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CursoMotInteresController : APIBaseController
    {
        private readonly ICursoMotInteresRepository _cursomotinteresRepository;
        public CursoMotInteresController(ICursoMotInteresRepository cursomotinteresRepository)
        {
            _cursomotinteresRepository = cursomotinteresRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CursoMotInteres>> GetChartInfo()
        {
            var curso_motinteres = await _cursomotinteresRepository.GetCharInfoAsync();

            return Ok(curso_motinteres);
        }
    }
}