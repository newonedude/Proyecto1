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

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            /*modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.id_usuario)
                    .HasName("PK__tb_usuar__4E3E04ADA181AD10");

                entity.ToTable("tb_usuario");

                entity.Property(e => e.id_usuario).HasColumnName("id_usuario");

                entity.Property(e => e.ape_materno)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ape_materno");

                entity.Property(e => e.ape_paterno)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ape_paterno");

                entity.Property(e => e.dni)
                    .IsRequired()
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("dni")
                    .IsFixedLength(true);

                entity.Property(e => e.email)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.estado).HasColumnName("estado");

                entity.Property(e => e.nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre");

                entity.Property(e => e.password)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.rol)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("rol");

                entity.Property(e => e.usuario)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("usuario");
            });

            modelBuilder.Entity<Estudiante>(entity =>
            {
                entity.HasKey(e => e.id_estudiante)
                    .HasName("PK__tb_estud__E0B2763CB7CE2498");

                entity.ToTable("tb_estudiante");

                entity.Property(e => e.id_estudiante).HasColumnName("id_estudiante");

                entity.Property(e => e.ape_materno_apod)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ape_materno_apod");

                entity.Property(e => e.ape_paterno_apod)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("ape_paterno_apod");

                entity.Property(e => e.celular_apod)
                    .HasMaxLength(9)
                    .IsUnicode(false)
                    .HasColumnName("celular_apod")
                    .IsFixedLength(true);

                entity.Property(e => e.dni_apod)
                    .HasMaxLength(8)
                    .IsUnicode(false)
                    .HasColumnName("dni_apod")
                    .IsFixedLength(true);

                entity.Property(e => e.email_apod)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("email_apod");

                entity.Property(e => e.fecha_ingreso)
                    .HasColumnType("date")
                    .HasColumnName("fecha_ingreso");

                entity.Property(e => e.fecha_nacimiento)
                    .HasColumnType("date")
                    .HasColumnName("fecha_nacimiento");

                entity.Property(e => e.id_usuario).HasColumnName("id_usuario");

                entity.Property(e => e.nombre_apod)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("nombre_apod");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Estudiante)
                    .HasForeignKey(d => d.id_usuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Estudiante_Usuario");
            });

            modelBuilder.Entity<Seccion>(entity =>
            {
                entity.HasKey(e => e.id_seccion)
                    .HasName("PK__tb_secci__7C91FD81A3AF54AF");

                entity.ToTable("tb_seccion");

                entity.Property(e => e.id_seccion).HasColumnName("id_seccion");

                entity.Property(e => e.anio).HasColumnName("anio");

                entity.Property(e => e.capacidad).HasColumnName("capacidad");

                entity.Property(e => e.grado)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("grado")
                    .IsFixedLength(true);

                entity.Property(e => e.nivel)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("nivel");

                entity.Property(e => e.seccion)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("seccion");
            });

            modelBuilder.Entity<Matricula>(entity =>
            {
                entity.HasKey(e => e.id_matricula)
                    .HasName("PK__tb_matri__1D7CF00BD9503B65");

                entity.ToTable("tb_matricula");

                entity.Property(e => e.id_matricula).HasColumnName("id_matricula");

                entity.Property(e => e.anio).HasColumnName("anio");

                entity.Property(e => e.fecha_matricula)
                    .HasColumnType("date")
                    .HasColumnName("fecha_matricula");

                entity.Property(e => e.id_estudiante).HasColumnName("id_estudiante");

                entity.Property(e => e.id_seccion).HasColumnName("id_seccion");

                entity.HasOne(d => d.Estudiante)
                    .WithMany(p => p.Matricula)
                    .HasForeignKey(d => d.id_estudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Matricula_Estudiante");

                entity.HasOne(d => d.Seccion)
                    .WithMany(p => p.Matricula)
                    .HasForeignKey(d => d.id_seccion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Matricula_Seccion");
            });

            modelBuilder.Entity<DetalleMatricula>(entity =>
            {
                entity.HasKey(e => new { e.id_matricula, e.id_curso })
                    .HasName("PK__tb_detal__28AF075B9410BC96");

                entity.ToTable("tb_detalle_matricula");

                entity.Property(e => e.id_matricula).HasColumnName("id_matricula");

                entity.Property(e => e.id_curso).HasColumnName("id_curso");

                entity.Property(e => e.id_docente).HasColumnName("id_docente");

                entity.HasOne(d => d.Curso)
                    .WithMany(p => p.DetalleMatricula)
                    .HasForeignKey(d => d.id_curso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleMatricula_Curso");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.DetalleMatricula)
                    .HasForeignKey(d => d.id_docente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleMatricula_Docente");

                entity.HasOne(d => d.Matricula)
                    .WithMany(p => p.DetalleMatricula)
                    .HasForeignKey(d => d.id_matricula)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DetalleMatricula_Matricula");
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.HasKey(e => e.id_curso)
                    .HasName("PK__tb_curso__5D3F75026212D557");

                entity.ToTable("tb_curso");

                entity.Property(e => e.id_curso).HasColumnName("id_curso");

                entity.Property(e => e.descripcion)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("descripcion");
            });

            modelBuilder.Entity<Asesoria>(entity =>
            {
                entity.HasKey(e => e.id_asesoria)
                    .HasName("PK__tb_aseso__705CD399B4AF9AE6");

                entity.ToTable("tb_asesoria");

                entity.Property(e => e.id_asesoria).HasColumnName("id_asesoria");

                entity.Property(e => e.estado)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("estado");

                entity.Property(e => e.fecha)
                    .HasColumnType("date")
                    .HasColumnName("fecha");

                entity.Property(e => e.id_curso).HasColumnName("id_curso");

                entity.Property(e => e.id_docente).HasColumnName("id_docente");

                entity.Property(e => e.id_estudiante).HasColumnName("id_estudiante");

                entity.Property(e => e.id_seccion).HasColumnName("id_seccion");

                entity.HasOne(d => d.Curso)
                    .WithMany(p => p.Asesoria)
                    .HasForeignKey(d => d.id_curso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Asesoria_Curso");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Asesoria)
                    .HasForeignKey(d => d.id_docente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Asesoria_Docente");

                entity.HasOne(d => d.Estudiante)
                    .WithMany(p => p.Asesoria)
                    .HasForeignKey(d => d.id_estudiante)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Asesoria_Estudiante");

                entity.HasOne(d => d.Seccion)
                    .WithMany(p => p.Asesoria)
                    .HasForeignKey(d => d.id_seccion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Asesoria_Seccion");
            });

            modelBuilder.Entity<Nota>(entity =>
            {
                entity.HasKey(e => new { e.id_matricula, e.id_curso, e.id_docente })
                    .HasName("PK__tb_notas__389F0AE923DA2231");

                entity.ToTable("tb_notas");

                entity.Property(e => e.id_matricula).HasColumnName("id_matricula");

                entity.Property(e => e.id_curso).HasColumnName("id_curso");

                entity.Property(e => e.id_docente).HasColumnName("id_docente");

                entity.Property(e => e.calificacion)
                    .HasColumnType("decimal(18, 0)")
                    .HasColumnName("calificacion");

                entity.Property(e => e.tipo_prueba)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("tipo_prueba");

                entity.HasOne(d => d.Curso)
                    .WithMany(p => p.Nota)
                    .HasForeignKey(d => d.id_curso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notas_Curso");

                entity.HasOne(d => d.Usuario)
                    .WithMany(p => p.Nota)
                    .HasForeignKey(d => d.id_docente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notas_Docente");

                entity.HasOne(d => d.Matricula)
                    .WithMany(p => p.Nota)
                    .HasForeignKey(d => d.id_matricula)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Notas_Matricula");
            });*/

            modelBuilder.Entity<DetalleMatricula>()
            .HasKey(e=>new {e.id_matricula, e.id_curso});

            modelBuilder.Entity<Nota>()
            .HasKey(e=>new {e.id_matricula, e.id_curso, e.id_docente});
        }
    }
}