using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MatriculasController : APIBaseController
    {
        private readonly IMatriculaRepository _matriculaRepository;
        private readonly IMapper mapper;

        public MatriculasController(IMatriculaRepository matriculaRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _matriculaRepository = matriculaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<MatriculaDTO>> GetMatriculas()
        {
            var matriculas = await _matriculaRepository.GetMatriculasAsync();
            var matriculasToReturn = mapper.Map<IEnumerable<MatriculaDTO>>(matriculas);

            return Ok(matriculasToReturn);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Matricula>> RegistrarMatricula(MatriculaDTO matriculaDTO)
        {
            var matricula = new Matricula
            {
                id_estudiante = matriculaDTO.id_estudiante,
                id_seccion = matriculaDTO.id_seccion,
                anio = matriculaDTO.anio,
                fecha_matricula = matriculaDTO.fecha_matricula
            };

            var mat = await _matriculaRepository.Insertar(matricula);
            var matriculaToReturn = mapper.Map<MatriculaDTO>(mat);

            return Ok(matriculaToReturn);
        }
    }
}