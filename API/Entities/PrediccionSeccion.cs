using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("rp_prediccion_seccion")]
    public class PrediccionSeccion
    {
        public string grado { get; set; }
        public string seccion { get; set; }
        public string nivel { get; set; }
        public short anio { get; set; }
        public string periodo { get; set; }
        public short total_matriculados { get; set; }
        public short desaprobados { get; set; }
        public short aprobados { get; set; }
        public decimal porcentaje_aprob { get; set; }
        public decimal porcentaje_desa { get; set; }
    }
}