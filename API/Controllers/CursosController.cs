using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CursosController:APIBaseController
    {
        private readonly ICursoRepository _cursoRepository;
        private readonly IMapper mapper;
        
        public CursosController(ICursoRepository cursoRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _cursoRepository = cursoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CursoDTO>>> GetCursos()
        {
            var cursos = await _cursoRepository.GetCursosAsync();

            var cursosToReturn = mapper.Map<IEnumerable<CursoDTO>>(cursos);

            return Ok(cursosToReturn);
        }

        [HttpGet("desc/{descripcion}")]
        public async Task<ActionResult<Curso>> GetCursoByDescription(string descripcion)
        {
            return await _cursoRepository.GetCursoByDescriptionAsync(descripcion);
        }
    }
}