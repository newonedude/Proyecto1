using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using API.DTO;
using API.Interfaces;
using AutoMapper;
using API.Services;

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

        [HttpGet("dni/{dni}")]
        public async Task<ActionResult<Usuario>> GetUsuarioDni(string dni)
        {
            return await _userRepository.GetUserByDniAsync(dni);
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
        public async Task<ActionResult<object>> Login(LoginDTO loginDTO)
        {
            var user = await _userRepository.Log(loginDTO);

            if (user == null || loginDTO.password != user.password)
            {
                return new HttpStatusCodeException(System.Net.HttpStatusCode.Unauthorized, "Invalid User", null);
            }
            else
            {
                var usuario = new UserTokenDTO
                {
                    id_usuario = user.id_usuario,
                    dni = user.dni,
                    nombre = user.nombre,
                    ape_paterno = user.ape_paterno,
                    ape_materno = user.ape_materno,
                    usuario = user.usuario,
                    token = _tokenService.CreateToken(user),
                    rol = user.rol
                };

                return new HttpStatusCodeException(System.Net.HttpStatusCode.OK, "Bienvenido", usuario);
            }

        }

        private async Task<bool> UsuarioExiste(string usuario)
        {
            return await _userRepository.UsuarioExist(usuario);
        }
    }
}