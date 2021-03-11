using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Data;

namespace API.Entities
{
    [Table("tb_usuario")]
    public class Usuario
    {
        [Key]
        public short id_usuario { get; set; }
        public string nombre { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string dni { get; set; }
        public string usuario { get; set; }
        public string password { get; set; }
        public string rol { get; set; }
        public string email { get; set; }
        public bool? estado { get; set; }
    }
}