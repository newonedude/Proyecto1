using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class SeccionesController : APIBaseController
    {
        private readonly ISeccionRepository _seccionRepository;
        private readonly IMapper mapper;

        public SeccionesController(ISeccionRepository seccionRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _seccionRepository = seccionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SeccionDTO>>> GetSecciones()
        {
            var secciones = await _seccionRepository.GetSeccionesAsync();
            var seccionesToReturn = mapper.Map<IEnumerable<SeccionDTO>>(secciones);

            return Ok(seccionesToReturn);
        }

        [HttpGet("{id_seccion}")]
        public async Task<ActionResult<Seccion>> GetSeccion(short id_seccion)
        {
            return await _seccionRepository.GetSeccionesByIdAsync(id_seccion);
        }

        [HttpGet("details")]
        public async Task<ActionResult<Seccion>> GetSeccionDetails(string nivel, string grado, string seccion, short anio)
        {
            return await _seccionRepository.GetSeccionByDetailAsync(nivel, grado, seccion, anio);
        }
        
        [HttpPost("registrar")]
        public async Task<ActionResult<SeccionDTO>> RegistrarSeccion(SeccionDTO secciondto)
        {
            var seccion = new Seccion
            {
                nivel = secciondto.nivel,
                grado = secciondto.grado,
                seccion = secciondto.seccion,
                anio = secciondto.anio,
                capacidad = secciondto.capacidad,
                estado = secciondto.estado
            };

            var secc = await _seccionRepository.Insertar(seccion);
            var seccionToReturn = mapper.Map<SeccionDTO>(seccion);

            return Ok(seccionToReturn);
        }
    }
}