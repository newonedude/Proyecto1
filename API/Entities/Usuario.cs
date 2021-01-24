using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Usuario
    {
        [Key]
        public System.Int16 id_usuario { get; set; }
        public string nombre { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string dni { get; set; }
        public string usuario { get; set; }
        public string contraseña { get; set; }
        public string rol { get; set; }
        public string email { get; set; }
    }
}