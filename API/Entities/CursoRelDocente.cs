using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("rp_curso_reldocente")]
    public class CursoRelDocente
    {
        public string grado { get; set; }
        public string nivel { get; set; }
        public short anio { get; set; }
        public string periodo { get; set; }
        public decimal puede_mejorar { get; set; }
        public decimal buena { get; set; }
        public decimal excelente { get; set; }
    }
}