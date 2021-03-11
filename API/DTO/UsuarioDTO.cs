using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Data;
using API.Entities;

namespace API.DTO
{
    public class UsuarioDTO
    {
        public short id_usuario { get; set; }
        public string nombre { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string rol { get; set; }
        public string dni { get; set; }
        public string email { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
        public bool? estado { get; set; }
    }
}