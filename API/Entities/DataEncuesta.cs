using System.Security.AccessControl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class DataEncuesta
    {
        public string edad { get; set; }
        public string edu_padre { get; set; }
        public string tam_familia { get; set; }
        public string apoderado { get; set; }
        public string cal_materiales { get; set; }
        public string cal_rela_docente { get; set; }
        public string apoyo_fam_curso { get; set; }
        public string mot_interes { get; set; }
        public string nivel_interes { get; set; }
        public string horas_estudio { get; set; }

        public string T1_Segundo { get; set; }
        public string T2_segundo { get; set; }
        public string C_Final_Primero { get; set; }
    }
}