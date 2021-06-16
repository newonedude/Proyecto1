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
                sexo = encuestadto.sexo,
                edad = encuestadto.edad,
                edu_madre = encuestadto.edu_madre,
                edu_padre = encuestadto.edu_padre,
                tam_familia = encuestadto.tam_familia,
                num_hermanos = encuestadto.num_hermanos,
                vive_con_padres = encuestadto.vive_con_padres,
                apoderado = encuestadto.apoderado,
                dedi_apoderado = encuestadto.dedi_apoderado,
                cal_materiales = encuestadto.cal_materiales,
                cal_rela_companeros = encuestadto.cal_rela_companeros,
                cal_rela_docente = encuestadto.cal_rela_docente,
                cal_rela_padres = encuestadto.cal_rela_padres,
                clases_particulares = encuestadto.clases_particulares,
                horas_estudio = encuestadto.horas_estudio,
                apoyo_fam_curso = encuestadto.apoyo_fam_curso,
                mot_interes = encuestadto.mot_interes,
                nivel_interes = encuestadto.nivel_interes,
                internet = encuestadto.internet,
                dur_viaje_colegio = encuestadto.dur_viaje_colegio,
                enfermedad = encuestadto.enfermedad,
                frec_act_recreativas = encuestadto.frec_act_recreativas,
                cursar_carrera = encuestadto.cursar_carrera,
                apoyo_fam_carrera = encuestadto.apoyo_fam_carrera,
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
                sexo = encuestadto.sexo,
                edad = encuestadto.edad,
                edu_madre = encuestadto.edu_madre,
                edu_padre = encuestadto.edu_padre,
                tam_familia = encuestadto.tam_familia,
                num_hermanos = encuestadto.num_hermanos,
                vive_con_padres = encuestadto.vive_con_padres,
                apoderado = encuestadto.apoderado,
                dedi_apoderado = encuestadto.dedi_apoderado,
                cal_materiales = encuestadto.cal_materiales,
                cal_rela_companeros = encuestadto.cal_rela_companeros,
                cal_rela_docente = encuestadto.cal_rela_docente,
                cal_rela_padres = encuestadto.cal_rela_padres,
                clases_particulares = encuestadto.clases_particulares,
                horas_estudio = encuestadto.horas_estudio,
                apoyo_fam_curso = encuestadto.apoyo_fam_curso,
                mot_interes = encuestadto.mot_interes,
                nivel_interes = encuestadto.nivel_interes,
                internet = encuestadto.internet,
                dur_viaje_colegio = encuestadto.dur_viaje_colegio,
                enfermedad = encuestadto.enfermedad,
                frec_act_recreativas = encuestadto.frec_act_recreativas,
                cursar_carrera = encuestadto.cursar_carrera,
                apoyo_fam_carrera = encuestadto.apoyo_fam_carrera,
                fecha_registro = encuestadto.fecha_registro,
                estado = encuestadto.estado
            };

            var encuest = await _encuestaRepository.Update(survey);
            var encuestaToReturn = mapper.Map<Encuesta>(encuest);
            return Ok(encuestaToReturn);
        }
    }
}