using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API.Data
{
    [Table("tb_notas")]
    public class Nota
    {
        public short id_matricula { get; set; }
        public short id_asignacion { get; set; }
        public string p1 { get; set; }
        public string p2 { get; set; }
        public string p3 { get; set; }
        public string cf { get; set; }
    }
}