using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Data;

namespace API.Entities
{
    [Table("tb_estudiante")]
    public class Estudiante
    {
        [Key]   
        public short id_estudiante { get; set; }
        public short id_usuario { get; set; }
        public DateTime fecha_ingreso { get; set; }
        public DateTime fecha_nacimiento { get; set; }
        public string nombre_apod { get; set; }
        public string ape_paterno_apod { get; set; }
        public string ape_materno_apod { get; set; }
        public string dni_apod { get; set; }
        public string celular_apod { get; set; }
        public string email_apod { get; set; }
        public bool? estado { get; set; }
    }
}