using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EncuestasController:APIBaseController
    {
        private readonly IEncuestaRepository _encuestaRepository;
        private readonly IMapper mapper;

        public EncuestasController(IEncuestaRepository encuestaRepository, IMapper mapper)
        {
            this.mapper = mapper;
            _encuestaRepository = encuestaRepository;
        }

        [HttpGet("idmatricula/{id_matricula}")]
        public async Task<ActionResult<Encuesta>> GetEncuestaByIdMatricula(short id_matricula)
        {
            return await _encuestaRepository.GetEncuestaByIdMatriculaAsync(id_matricula);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Encuesta>> RegistrarEncuesta(EncuestaDTO encuestadto)
        {
            var encuesta = new Encuesta{
                id_matricula = encuestadto.id_matricula,
                edad = encuestadto.edad,
                edu_padre = encuestadto.edu_padre,
                tam_familia = encuestadto.tam_familia,
                apoderado = encuestadto.apoderado,
                cal_materiales = encuestadto.cal_materiales,
                cal_rela_docente = encuestadto.cal_rela_docente,
                horas_estudio = encuestadto.horas_estudio,
                apoyo_fam_curso = encuestadto.apoyo_fam_curso,
                mot_interes = encuestadto.mot_interes,
                nivel_interes = encuestadto.nivel_interes,
                estado = encuestadto.estado,
                fecha_registro = encuestadto.fecha_registro
            };

            var survey = await _encuestaRepository.Insertar(encuesta);
            var encuestaToReturn = mapper.Map<EncuestaDTO>(encuesta);

            return Ok(encuestaToReturn);
        }

        [HttpPut("actualizar")]
        public async Task<ActionResult<EncuestaDTO>> Actualizar(EncuestaDTO encuestadto)
        {
            var survey = new Encuesta
            {
                id_encuesta = encuestadto.id_encuesta,
                id_matricula = encuestadto.id_matricula,
                edad = encuestadto.edad,
                edu_padre = encuestadto.edu_padre,
                tam_familia = encuestadto.tam_familia,
                apoderado = encuestadto.apoderado,
                cal_materiales = encuestadto.cal_materiales,
                cal_rela_docente = encuestadto.cal_rela_docente,
                horas_estudio = encuestadto.horas_estudio,
                apoyo_fam_curso = encuestadto.apoyo_fam_curso,
                mot_interes = encuestadto.mot_interes,
                nivel_interes = encuestadto.nivel_interes,
                estado = encuestadto.estado,
                fecha_registro = encuestadto.fecha_registro
            };

            var encuest = await _encuestaRepository.Update(survey);
            var encuestaToReturn = mapper.Map<Encuesta>(encuest);
            return Ok(encuestaToReturn);
        }
    }
}