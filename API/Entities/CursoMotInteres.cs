using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class CursoMotInteres
    {
        public string grado { get; set; }
        public string nivel { get; set; }
        public short anio { get; set; }
        public string periodo { get; set; }
        public decimal por_profesor { get; set; }
        public decimal por_curso { get; set; }
        public decimal otros { get; set; }
    }
}