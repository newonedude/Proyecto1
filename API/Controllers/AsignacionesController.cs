using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AsignacionesController:APIBaseController
    {
        private readonly IAsignacionRepository _asignacionRepository;
        private readonly IMapper mapper;

        public AsignacionesController(IAsignacionRepository asignacionRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _asignacionRepository = asignacionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AsignacionDTO>>> GetAsignaciones()
        {
            var asignaciones = await _asignacionRepository.GetAsignacionAsync();

            var asignacionesToReturn = mapper.Map<IEnumerable<AsignacionDTO>>(asignaciones);

            return Ok(asignacionesToReturn);
        }

        [HttpGet("details")]
        public async Task<ActionResult<Asignacion>> GetAsignacionByDetailAsync(short id_seccion, short id_curso, short anio, Boolean estado)
        {
            return await _asignacionRepository.GetAsignacionByDetailAsync(id_seccion, anio, estado, id_curso);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Asignacion>> RegistrarAsignacion(AsignacionDTO asignaciondto)
        {
            if(await AsignacionExiste(asignaciondto)) return BadRequest("Asignacion ya existe");

            var asignacion = new Asignacion
            {
                id_docente = asignaciondto.id_docente,
                id_curso = asignaciondto.id_curso,
                id_seccion = asignaciondto.id_seccion,
                anio = asignaciondto.anio,
                estado = asignaciondto.estado
            };

            var asignacionn = await _asignacionRepository.Insertar(asignacion);
            var asignacionToReturn = mapper.Map<AsignacionDTO>(asignacionn);

            return Ok(asignacionToReturn);
        }

        private async Task<bool> AsignacionExiste(AsignacionDTO asignacion)
        {
            return await _asignacionRepository.AsignacionExist(asignacion);
        }
    }
}