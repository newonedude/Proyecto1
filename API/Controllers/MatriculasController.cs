using System;
using System.Collections;
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
            if(await MatriculaExiste(matriculaDTO)) return BadRequest("Matricula ya existe");

            var matricula = new Matricula
            {
                id_estudiante = matriculaDTO.id_estudiante,
                id_seccion = matriculaDTO.id_seccion,
                anio = matriculaDTO.anio,
                fecha_matricula = matriculaDTO.fecha_matricula,
                estado = matriculaDTO.estado,
                encuesta_realizada = matriculaDTO.encuesta_realizada,
                permiso_apoderado = matriculaDTO.permiso_apoderado
            };

            var mat = await _matriculaRepository.Insertar(matricula);
            var matriculaToReturn = mapper.Map<MatriculaDTO>(mat);

            return Ok(matriculaToReturn);
        }

        [HttpGet("idestudiante/{id_estudiante}")]
        public async Task<ActionResult<Matricula>> GetMatriculaByIdEstudiante(short id_estudiante)
        {
            return await _matriculaRepository.GetMatriculaByIdEstudianteAsync(id_estudiante);
        }

        [HttpGet("dniestudiante/{dni}")]
        public async Task<ActionResult<Matricula>> GetMatriculaIdByDni(string dni)
        {
            var matricula = await _matriculaRepository.GetMatriculaByDNI(dni);

            if(matricula == null) return NotFound("No existe Matricula");
            return await _matriculaRepository.GetMatriculaByDNI(dni);
        }

        [HttpGet("dnimatriculas/{dni}")]
        public async Task<ActionResult<Matricula>> GetMatriculasByDni(string dni)
        {
            var matriculas = await _matriculaRepository.GetMatriculasByDNI(dni);

            if(matriculas == null) return NotFound("No existen Matriculas");

            return Ok(matriculas);
        }

        [HttpGet("idmatricula/{id_matricula}")]
        public async Task<ActionResult<Matricula>> GetMatriculaById(short id_matricula)
        {
            return await _matriculaRepository.GetMatriculaById(id_matricula);
        }

        [HttpPut("actualizar")]
        public async Task<ActionResult<MatriculaDTO>> Actualizar(MatriculaDTO matriculadto)
        {
            var mat = new Matricula
            {
                id_matricula = matriculadto.id_matricula,
                id_estudiante = matriculadto.id_estudiante,
                id_seccion = matriculadto.id_seccion,
                anio = matriculadto.anio,
                fecha_matricula = matriculadto.fecha_matricula,
                estado = matriculadto.estado,
                encuesta_realizada = matriculadto.encuesta_realizada,
                permiso_apoderado = matriculadto.permiso_apoderado
            };

            var enrollment = await _matriculaRepository.Update(mat);
            var matriculaToReturn = mapper.Map<MatriculaDTO>(enrollment);

            return Ok(matriculaToReturn);
        }

        [HttpGet("autorizar/{id_matricula}")]
        public async Task<ActionResult<string>> Autorizar(short id_matricula)
        {
            return await _matriculaRepository.Autorizar(id_matricula);
        }

        private async Task<bool> MatriculaExiste(MatriculaDTO matriculadto)
        {
            return await _matriculaRepository.MatriculaExist(matriculadto);
        }

        [HttpGet("matriculastable")]
        public async Task<ActionResult<IEnumerable>> GetMatriculasTable()
        {
            var matriculas = await _matriculaRepository.GetMatriculasTable();
            return Ok(matriculas);
        }
    }
}