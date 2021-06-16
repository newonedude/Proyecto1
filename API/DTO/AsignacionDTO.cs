namespace API.DTO
{
    public class AsignacionDTO
    {
        public short id_asignacion { get; set; }
        public short id_docente { get; set; }
        public short id_curso { get; set; }
        public short id_seccion { get; set; }
        public short anio { get; set; }
        public bool? estado { get; set; }
    }
}