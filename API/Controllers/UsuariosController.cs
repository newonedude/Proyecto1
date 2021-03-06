using System;
using System.Threading.Tasks;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTO;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace API.Controllers
{
    public class UsuariosController : APIBaseController
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        private readonly IMapper mapper;

        public UsuariosController(IUserRepository userRepository, ITokenService tokenService, IMapper mapper)
        {
            this.mapper = mapper;
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios()
        {
            var usuarios = await _userRepository.GetUsersAsync();

            var usuariosToReturn = mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);

            return Ok(usuariosToReturn);
        }

        [HttpGet("{id_usuario}")]
        public async Task<ActionResult<Usuario>> GetUsuario(short id_usuario)
        {
            return await _userRepository.GetUsersByIdAsync(id_usuario);
        }

        [HttpGet("rol/{rol}")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuariosRol(String rol)
        {
            var usuarios = await _userRepository.GetUsersByRoleAsync(rol);

            var usuariosToReturn = mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);

            return Ok(usuariosToReturn);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioDTO>> RegistrarUsuario(UsuarioDTO usuariodto)
        {
            if (await UsuarioExiste(usuariodto.usuario)) return BadRequest("Usuario ya existe");

            var usuario = new Usuario
            {
                nombre = usuariodto.nombre,
                ape_paterno = usuariodto.ape_paterno,
                ape_materno = usuariodto.ape_materno,
                dni = usuariodto.dni,
                email = usuariodto.email,
                rol = usuariodto.rol,
                usuario = usuariodto.usuario,
                password = usuariodto.password,
                estado = usuariodto.estado
            };

            var user = await _userRepository.Insertar(usuario);
            var usuarioToReturn = mapper.Map<UsuarioDTO>(user);

            return Ok(usuarioToReturn);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userRepository.Log(loginDTO);

            if (user == null) return Unauthorized("Usuario inválido");

            if (loginDTO.password != user.password) return Unauthorized("Contraseña inválida");

            return new UserTokenDTO
            {
                usuario = user.usuario,
                token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UsuarioExiste(string usuario)
        {
            return await _userRepository.UsuarioExist(usuario);
        }
    }
}