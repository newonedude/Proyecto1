using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) :base(options)
        {
        }
        public virtual DbSet<Usuario> tb_usuario { get; set; }
        public virtual DbSet<Estudiante> tb_estudiante { get; set; }
        public virtual DbSet<Seccion> tb_seccion {get; set;}
        public virtual DbSet<Matricula> tb_matricula {get; set;}
        public virtual DbSet<DetalleMatricula> tb_detalle_matricula { get; set; }
        public virtual DbSet<Curso> tb_curso { get; set; }
        public virtual DbSet<Asesoria> tb_asesoria { get; set; }
        public virtual DbSet<Nota> tb_notas { get; set; }
        public virtual DbSet<Encuesta> tb_encuesta { get; set; }
        public virtual DbSet<Asignacion> tb_asignacion_docente {get; set;}
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<DetalleMatricula>()
            .HasKey(e=>new {e.id_matricula, e.id_asignacion});

            modelBuilder.Entity<Nota>()
            .HasKey(e=>new {e.id_matricula, e.id_asignacion});
        }
    }
}