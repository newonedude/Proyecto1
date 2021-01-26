using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class UsuarioDTO
    {
        [Required]
        public string nombre { get; set; }
        [Required]
        public string ape_paterno { get; set; }
        [Required]
        public string ape_materno { get; set; }
        [Required]
        public string rol { get; set; }
        [Required]
        public string dni { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string usuario { get; set; }
        [Required]
        public string password { get; set; }
    }
}