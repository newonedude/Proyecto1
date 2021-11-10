using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CursoHorasEstudioController : APIBaseController
    {
        private readonly ICursoHorasEstudioRepository _cursohorasestudioRepository;
        public CursoHorasEstudioController(ICursoHorasEstudioRepository cursohorasestudioRepository)
        {
            _cursohorasestudioRepository = cursohorasestudioRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CursoHorasEstudio>> GetChartInfo()
        {
            var curso_horasestudio = await _cursohorasestudioRepository.GetCharInfoAsync();

            return Ok(curso_horasestudio);
        }
    }
}