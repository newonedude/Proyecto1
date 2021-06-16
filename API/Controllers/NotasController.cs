using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NotasController:APIBaseController
    {
        private readonly INotaRepository _notaRepository;
        private readonly IMapper mapper;

        public NotasController(INotaRepository notaRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _notaRepository = notaRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotaDTO>>> GetNotas()
        {
            var notas = await _notaRepository.GetNotasAsync();
            var notasToReturn = mapper.Map<IEnumerable<NotaDTO>>(notas);

            return Ok(notasToReturn);
        }

        [HttpGet("calificaciones")]
        public async Task<ActionResult<IEnumerable>> GetCalificaciones()
        {
            var calificaciones = await _notaRepository.GetCalificaciones();
            return Ok(calificaciones);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Nota>> RegistrarNota(NotaDTO notadto)
        {
            var nota = new Nota
            {
                id_matricula = notadto.id_matricula,
                id_asignacion = notadto.id_asignacion,
                p1 = notadto.p1,
                p2 = notadto.p2,
                p3 = notadto.p3,
                cf = notadto.cf
            };

            var note = await _notaRepository.Insertar(nota);
            var notaToReturn = mapper.Map<NotaDTO>(note);

            return Ok(notaToReturn);
        }

        [HttpPut("actualizar")]
        public async Task<ActionResult<NotaDTO>> Actualizar(NotaDTO notadto)
        {
            var not = new Nota
            {
                id_matricula = notadto.id_matricula,
                id_asignacion = notadto.id_asignacion,
                p1 = notadto.p1,
                p2 = notadto.p2,
                p3 = notadto.p3,
                cf = notadto.cf
            };

            var note = await _notaRepository.Update(not);
            var notaToReturn = mapper.Map<NotaDTO>(note);

            return Ok(notaToReturn);
        }
    }
}