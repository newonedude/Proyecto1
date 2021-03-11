using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Data;

namespace API.Entities
{
    [Table("tb_curso")]
    public class Curso
    {
        [Key]
        public short id_curso { get; set; }
        public string descripcion { get; set; }
    }
}