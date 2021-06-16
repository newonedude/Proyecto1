using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Data;

namespace API.Entities
{
    [Table("tb_seccion")]
    public class Seccion
    {
        [Key]   
        public short id_seccion { get; set; }
        public string nivel { get; set; }
        public string grado { get; set; }
        public string seccion { get; set; }
        public short anio { get; set; }
        public short capacidad { get; set; }
        public bool? estado { get; set; }
    }
}