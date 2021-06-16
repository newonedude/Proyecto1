using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTO;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        Task<Boolean> SaveAllAsync();
        Task<IEnumerable<Usuario>> GetUsersAsync();
        Task<IEnumerable<Usuario>> GetUsersByRoleAsync(string rol);
        Task<Usuario> GetUsersByIdAsync(short id_usuario);
        void Update(Usuario usuario);
        Task<Usuario> Insertar(Usuario usuario);
        Task<bool> UsuarioExist(string usuario);
        Task<Usuario> Log(LoginDTO logindto);
        Task<Usuario> GetUserByDniAsync(string dni);
    }
}