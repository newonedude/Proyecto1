using API.Data;
using API.DTO;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Usuario, UsuarioDTO>();
            CreateMap<Estudiante, EstudianteDTO>();
            CreateMap<Matricula, MatriculaDTO>();
            CreateMap<Seccion, SeccionDTO>();
            CreateMap<DetalleMatricula, DetalleMatriculaDTO>();
            CreateMap<Curso, CursoDTO>();
            CreateMap<Asesoria, AsesoriaDTO>();
            CreateMap<Encuesta, EncuestaDTO>();
            CreateMap<Nota, NotaDTO>();
            CreateMap<Asignacion, AsignacionDTO>();
        }
    }
}