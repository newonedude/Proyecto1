using System.ComponentModel;
namespace API.DTO
{
    public class UserTokenDTO
    {
        public short id_usuario { get; set; }
        public string dni { get; set; }
        public string nombre { get; set; }
        public string ape_paterno { get; set; }
        public string ape_materno { get; set; }
        public string usuario { get; set; }
        public string token { get; set; }
        public string rol { get; set; }
    }
}