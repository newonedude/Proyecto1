using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using API.DTO;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Usuario>> GetUsersAsync()
        {
            return await context.tb_usuario.ToListAsync();
        }

        public async Task<Usuario> GetUsersByIdAsync(short id_usuario)
        {
            return await context.tb_usuario.FindAsync(id_usuario);
        }

        public async Task<IEnumerable<Usuario>> GetUsersByRoleAsync(string rol)
        {
           return await context.tb_usuario.Where(e => e.rol == rol)
           .ToListAsync();
        }

        public async Task<Usuario> Insertar(Usuario usuario)
        {
            context.tb_usuario.Add(usuario);
            await context.SaveChangesAsync();
            return usuario;
        }

        public Task<bool> SaveAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public void Update(Usuario usuario)
        {
            context.Entry(usuario).State = EntityState.Modified;
        }

        public async Task<bool> UsuarioExist(string usuario)
        {
            return await context.tb_usuario.AnyAsync(x => x.usuario == usuario.ToLower());
        }

        public async Task<Usuario> Log(LoginDTO logindto)
        {
            return await this.context.tb_usuario.SingleOrDefaultAsync(x=>x.usuario == logindto.usuario);
        }
    }
}