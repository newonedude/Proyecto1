using System.Collections;
using System.Net;
using System;
using API.Data;
using API.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.DTO;
using AutoMapper;

namespace API.Controllers
{
    public class EstudiantesController:APIBaseController
    {
        private readonly IEstudianteRepository _estudianteRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper mapper;
        
        public EstudiantesController(IEstudianteRepository estudianteRepository, ITokenService tokenService, IMapper mapper)
        {
            this.mapper = mapper;
            _estudianteRepository = estudianteRepository;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstudianteDTO>>> GetEstudiantes()
        {
            var estudiantes = await _estudianteRepository.GetEstudiantesAsync();
            var estudiantesToReturn = mapper.Map<IEnumerable<EstudianteDTO>>(estudiantes);

            return Ok(estudiantesToReturn);
        }

        [HttpGet("{id_estudiante}")]
        public async Task<ActionResult<Estudiante>> GetEstudiante(short id_estudiante)
        {
            return await _estudianteRepository.GetEstudianteByIdAsync(id_estudiante);
        }

        [HttpGet("iduser/{id_usuario}")]
        public async Task<ActionResult<Estudiante>> GetEstudianteByIdUsuario(short id_usuario)
        {
            return await _estudianteRepository.GetEstudianteByIdUsuarioAsync(id_usuario);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Estudiante>> RegistrarEstudiante(EstudianteDTO estudiantedto)
        {
            var estudiante = new Estudiante
            {
                id_usuario = estudiantedto.id_usuario,
                fecha_ingreso = estudiantedto.fecha_ingreso,
                nombre_apod = estudiantedto.nombre_apod,
                ape_paterno_apod = estudiantedto.ape_paterno_apod,
                ape_materno_apod = estudiantedto.ape_materno_apod,
                dni_apod = estudiantedto.dni_apod,
                celular_apod = estudiantedto.celular_apod,
                email_apod = estudiantedto.email_apod,
                fecha_nacimiento = estudiantedto.fecha_nacimiento
            };

            var student = await _estudianteRepository.Insertar(estudiante);
            var estudianteToReturn = mapper.Map<EstudianteDTO>(student);

            return Ok(estudianteToReturn);
        }

    }
}