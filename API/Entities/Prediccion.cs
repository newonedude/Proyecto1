using System.Reflection.Metadata;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    [Table("tb_predicciones")]
    public class Prediccion
    {
        [Key]
        public int id_prediccion { get; set; }
        public short id_matricula { get; set; }
        public short id_asignacion { get; set; }
        public DateTime fecha_prediccion { get; set; }
        public string scored_labels { get; set; }
        public double scored_probabilities { get; set; }
        public int modelo { get; set; }
        public int cal_materiales { get; set; }
        public int cal_rela_docente { get; set; }
        public string horas_estudio { get; set; }
        public string mot_interes { get; set; }
        public int nivel_interes { get; set; }
        public bool? estado { get; set; }
    }
}