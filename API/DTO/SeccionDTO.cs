using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class SeccionDTO
    {
        public short id_seccion { get; set; }
        public string nivel { get; set; }
        public string grado { get; set; }
        public string seccion { get; set; }
        public short anio { get; set; }
        public short capacidad { get; set; }
        public bool? estado { get; set; }
    }
}