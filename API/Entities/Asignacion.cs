
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("tb_asignacion_docente")]
    public class Asignacion
    {
        [Key]
        public short id_asignacion { get; set; }
        public short id_docente { get; set; }
        public short id_curso { get; set; }
        public short id_seccion { get; set; }
        public short anio { get; set; }
        public bool? estado { get; set; }
    }
}