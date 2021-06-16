using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AsesoriasController : APIBaseController
    {
        private readonly IAsesoriaRepository _asesoriaRepository;
        private readonly IMapper mapper;

        public AsesoriasController(IAsesoriaRepository asesoriaRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _asesoriaRepository = asesoriaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AsesoriaDTO>>> GetAsesorias()
        {
            var asesorias = await _asesoriaRepository.GetAsesoriasAsync();
            var asesoriasToReturn = mapper.Map<IEnumerable<AsesoriaDTO>>(asesorias);

            return Ok(asesoriasToReturn);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Asesoria>> RegistrarAsesoria(AsesoriaDTO asesoriadto)
        {
            var asesoria = new Asesoria
            {
                id_curso = asesoriadto.id_curso,
                id_docente = asesoriadto.id_docente,
                id_seccion = asesoriadto.id_seccion,
                id_estudiante = asesoriadto.id_estudiante,
                fecha = asesoriadto.fecha,
                estado = asesoriadto.estado
            };

            var ases = await _asesoriaRepository.Insertar(asesoria);
            var asesoriaToReturn = mapper.Map<AsesoriaDTO>(ases);

            return Ok(asesoriaToReturn);
        }
    }
}