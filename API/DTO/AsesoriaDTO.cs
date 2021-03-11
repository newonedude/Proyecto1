using System;
namespace API.DTO
{
    public class AsesoriaDTO
    {
        public short id_asesoria { get; set; }
        public short id_docente { get; set; }
        public short id_estudiante { get; set; }
        public short id_seccion { get; set; }
        public short id_curso { get; set; }
        public DateTime fecha { get; set; }
        public string estado { get; set; }
    }
}