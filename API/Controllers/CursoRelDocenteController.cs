using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CursoRelDocenteController : APIBaseController
    {
        private readonly ICursoRelDocenteRepository _cursoreldocenteRepository;
        public CursoRelDocenteController(ICursoRelDocenteRepository cursoreldocenteRepository)
        {
            _cursoreldocenteRepository = cursoreldocenteRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CursoRelDocente>> GetChartInfo()
        {
            var curso_reldocente = await _cursoreldocenteRepository.GetCharInfoAsync();

            return Ok(curso_reldocente);
        }
    }
}