using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class MatriculaDTO
    {
        public short id_matricula { get; set; }
        public short id_estudiante { get; set; }
        public short id_seccion { get; set; }
        public short anio { get; set; }
        public DateTime fecha_matricula { get; set; }
        public bool? estado { get; set; }
        public bool? encuesta_realizada { get; set; }
        public bool? permiso_apoderado { get; set; }
    }
}