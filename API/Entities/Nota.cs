using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API.Data
{
    [Table("tb_nota")]
    public class Nota
    {
        public short id_matricula { get; set; }
        public short id_curso { get; set; }
        public short id_docente { get; set; }
        public string tipo_prueba { get; set; }
        public decimal calificacion { get; set; }
    }
}