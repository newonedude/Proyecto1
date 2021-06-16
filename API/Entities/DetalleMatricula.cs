using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("tb_detalle_matricula")]
    public class DetalleMatricula
    {
        public short id_matricula { get; set; }
        public short id_asignacion { get; set; }
        public bool? estado { get; set; }
    }
}