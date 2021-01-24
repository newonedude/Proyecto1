using System.Threading.Tasks;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController:ControllerBase
    {
        private readonly DataContext _context;
        public UsuariosController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.tb_usuario.ToListAsync();
        }

        [HttpGet("{id_usuario}")]
        public async Task<ActionResult<Usuario>> GetUsuario(System.Int16 id_usuario)
        {
            return await _context.tb_usuario.FindAsync(id_usuario);
        }
    }
}