using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CursoCalMaterialesController : APIBaseController
    {
        private readonly ICursoCalMaterialesRepository _cursocalmaterialesRepository;
        public CursoCalMaterialesController(ICursoCalMaterialesRepository cursocalmaterialesRepository)
        {
            _cursocalmaterialesRepository = cursocalmaterialesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CursoCalMateriales>> GetChartInfo()
        {
            var curso_calmateriales = await _cursocalmaterialesRepository.GetCharInfoAsync();

            return Ok(curso_calmateriales);
        }
    }
}