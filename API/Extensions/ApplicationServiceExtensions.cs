using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ISeccionRepository, SeccionRepository>();
            services.AddScoped<IEstudianteRepository, EstudianteRepository>();
            services.AddScoped<IMatriculaRepository, MatriculaRepository>();
            services.AddScoped<ICursoRepository, CursoRepository>();
            services.AddScoped<IDetalleMatriculaRepository, DetalleMatriculaRepository>();
            services.AddScoped<IAsesoriaRepository, AsesoriaRepository>();
            services.AddScoped<IEncuestaRepository, EncuestaRepository>();
            services.AddScoped<INotaRepository, NotaRepository>();
            services.AddScoped<IAsignacionRepository, AsignacionRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}