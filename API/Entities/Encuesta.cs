using System;
using System.Security.AccessControl;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("tb_encuesta")]
    public class Encuesta
    {
        [Key]
        public int id_encuesta { get; set; }
        public short id_matricula { get; set; }
        public short edad { get; set; }
        public string edu_padre { get; set; }
        public string tam_familia { get; set; }
        public string apoderado { get; set; }
        public short cal_materiales { get; set; }
        public short cal_rela_docente { get; set; }
        public string horas_estudio { get; set; }
        public string apoyo_fam_curso { get; set; }
        public string mot_interes { get; set; }
        public short nivel_interes { get; set; }
        public DateTime fecha_registro { get; set; }
        public bool? estado { get; set; }
    }
}