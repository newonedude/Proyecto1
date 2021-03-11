using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities;

namespace API.Data
{
    [Table("tb_asesoria")]
    public partial class Asesoria
    {
        [Key]
        public short id_asesoria { get; set; }
        public short id_docente { get; set; }
        public short id_estudiante { get; set; }
        public short id_seccion { get; set; }
        public short id_curso { get; set; }
        public DateTime fecha { get; set; }
        public string estado { get; set; }
    }
}