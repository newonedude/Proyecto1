using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("tb_detalle_matricula")]
    public class DetalleMatricula
    {
        public short id_matricula { get; set; }
        public short id_curso { get; set; }
        public short id_docente { get; set; }
    }
}