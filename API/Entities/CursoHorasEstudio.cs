using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("rp_curso_horasestudio")]
    public class CursoHorasEstudio
    {
        public string grado { get; set; }
        public string nivel { get; set; }
        public short anio { get; set; }
        public string periodo { get; set; }
        public decimal menos2horas { get; set; }
        public decimal entre2y5 { get; set; }
        public decimal masde5horas { get; set; }
    }
}