using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public virtual DbSet<Usuario> tb_usuario { get; set; }
        public virtual DbSet<Historial_Seccion> rp_historial_seccion { get; set; }
        public virtual DbSet<PrediccionSeccion> rp_prediccion_seccion { get; set; }
        public virtual DbSet<PrediccionGrado> rp_prediccion_grado { get; set; }
        public virtual DbSet<Historial_Grado> rp_historial_grado { get; set; }
        public virtual DbSet<CursoNivelInteres> rp_curso_nivelinteres { get; set; }
        public virtual DbSet<CursoCalMateriales> rp_curso_calmateriales { get; set; }
        public virtual DbSet<CursoMotInteres> rp_curso_motinteres { get; set; }
        public virtual DbSet<CursoHorasEstudio> rp_curso_horasestudio { get; set; }
        public virtual DbSet<CursoRelDocente> rp_curso_reldocente { get; set; }
        public virtual DbSet<Estudiante> tb_estudiante { get; set; }
        public virtual DbSet<Seccion> tb_seccion { get; set; }
        public virtual DbSet<Matricula> tb_matricula { get; set; }
        public virtual DbSet<DetalleMatricula> tb_detalle_matricula { get; set; }
        public virtual DbSet<Curso> tb_curso { get; set; }
        public virtual DbSet<Asesoria> tb_asesoria { get; set; }
        public virtual DbSet<Nota> tb_notas { get; set; }
        public virtual DbSet<Encuesta> tb_encuesta { get; set; }
        public virtual DbSet<Asignacion> tb_asignacion_docente { get; set; }
        public virtual DbSet<Prediccion> tb_predicciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<DetalleMatricula>()
            .HasKey(e => new { e.id_matricula, e.id_asignacion });

            modelBuilder.Entity<Nota>()
            .HasKey(e => new { e.id_matricula, e.id_asignacion });

            modelBuilder.Entity<Historial_Seccion>().HasNoKey();
            modelBuilder.Entity<PrediccionSeccion>().HasNoKey();
            modelBuilder.Entity<Historial_Grado>().HasNoKey();
            modelBuilder.Entity<PrediccionGrado>().HasNoKey();
            modelBuilder.Entity<CursoNivelInteres>().HasNoKey();
            modelBuilder.Entity<CursoCalMateriales>().HasNoKey();
            modelBuilder.Entity<CursoRelDocente>().HasNoKey();
            modelBuilder.Entity<CursoMotInteres>().HasNoKey();
            modelBuilder.Entity<CursoHorasEstudio>().HasNoKey();
        }
    }
}