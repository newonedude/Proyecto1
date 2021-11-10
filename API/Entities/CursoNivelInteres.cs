using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("rp_curso_nivelinteres")]
    public class CursoNivelInteres
    {
        public string grado { get; set; }
        public string nivel { get; set; }
        public short anio { get; set; }
        public string periodo { get; set; }
        public decimal poco_interesado { get; set; }
        public decimal interesado { get; set; }
        public decimal muy_interesado { get; set; }
    }
}