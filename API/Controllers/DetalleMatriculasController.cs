using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DetalleMatriculasController:APIBaseController
    {
        private readonly IDetalleMatriculaRepository _detalleMatricula;
        private readonly IMapper mapper;

        public DetalleMatriculasController(IDetalleMatriculaRepository detalleMatriculaRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _detalleMatricula = detalleMatriculaRepository;
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<DetalleMatricula>> RegistrarDetalleMatricula(DetalleMatriculaDTO detalleMatriculadto)
        {
            var detalleMatricula = new DetalleMatricula
            {
                id_matricula = detalleMatriculadto.id_matricula,
                id_asignacion = detalleMatriculadto.id_asignacion,
                estado = detalleMatriculadto.estado
            };

            var detmatricula = await _detalleMatricula.Insertar(detalleMatricula);
            var detmatriculaToReturn = mapper.Map<DetalleMatriculaDTO>(detmatricula);

            return Ok(detmatriculaToReturn);
        }
    }
}