using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("tb_matricula")]
    public partial class Matricula
    {
        [Key]
        public short id_matricula { get; set; }
        public short id_estudiante { get; set; }
        public short id_seccion { get; set; }
        public short anio { get; set; }
        public DateTime fecha_matricula { get; set; }
    }
}