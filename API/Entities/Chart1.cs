using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("chart_1")]
    public class Chart1
    {
        public string grado { get; set; }
        public string seccion { get; set; }
        public string nivel { get; set; }
        public int anio { get; set; }
        public int totalMatriculados { get; set; }
        public int desaprobados { get; set; }
        public int aprobados { get; set; }
        public decimal porcentajeDes { get; set; }
        public decimal porcentajeAprob { get; set; }
    }
}