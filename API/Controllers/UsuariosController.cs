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

namespace API.Controllers
{
    public class UsuariosController:APIBaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public UsuariosController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.tb_usuario.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id_usuario}")]
        public async Task<ActionResult<Usuario>> GetUsuario(System.Int16 id_usuario)
        {
            return await _context.tb_usuario.FindAsync(id_usuario);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UserTokenDTO>> RegistrarUsuario(UsuarioDTO usuariodto)
        {
            if(await UsuarioExiste(usuariodto.dni)) return BadRequest("Usuario ya existe");

            var user = new Usuario
            {
                nombre = usuariodto.nombre,
                ape_paterno = usuariodto.ape_paterno,
                ape_materno = usuariodto.ape_materno,
                dni = usuariodto.dni,
                email = usuariodto.email,
                rol = usuariodto.rol,
                usuario = usuariodto.usuario,
                password = usuariodto.password
            };

            _context.tb_usuario.Add(user);
            await _context.SaveChangesAsync();

            return new UserTokenDTO{
                usuario = user.usuario,
                token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserTokenDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _context.tb_usuario.SingleOrDefaultAsync(x=>x.usuario == loginDTO.usuario);

            if(user==null) return Unauthorized("Usuario inválido");

            if(loginDTO.password != user.password) return Unauthorized("Contraseña inválida");

            return new UserTokenDTO{
                usuario = user.usuario,
                token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UsuarioExiste(string dni)
        {
            return await _context.tb_usuario.AnyAsync(x => x.dni == dni.ToLower());
        }
    }
}