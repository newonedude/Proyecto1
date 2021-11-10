using System.Runtime.InteropServices;
using System.Collections;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using API.Entities;

namespace API.Controllers
{
    public class PrediccionesController:APIBaseController
    {
        private readonly IPrediccionRepository _prediccionRepository;

        public PrediccionesController(IPrediccionRepository prediccionRepository)
        {
            _prediccionRepository = prediccionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable>> GetPredicciones()
        {
            var predicciones = await _prediccionRepository.GetPredicciones();
            return Ok(predicciones);
        }

        [HttpGet("{year}")]
        public async Task<ActionResult<Prediccion>> GetPrediccionesAsync(int year)
        {
            var predicciones = await _prediccionRepository.GetPrediccionesAsync(year);

            return Ok(predicciones);
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<Prediccion>> RegistrarPrediccion(Prediccion prediccion)
        {
            var prediction = new Prediccion
            {
                id_matricula = prediccion.id_matricula,
                id_asignacion = prediccion.id_asignacion,
                fecha_prediccion = prediccion.fecha_prediccion,
                scored_labels = prediccion.scored_labels,
                scored_probabilities = prediccion.scored_probabilities,
                modelo = prediccion.modelo,
                cal_materiales = prediccion.cal_materiales,
                cal_rela_docente = prediccion.cal_rela_docente,
                horas_estudio = prediccion.horas_estudio,
                mot_interes = prediccion.mot_interes,
                nivel_interes = prediccion.nivel_interes,
                CF_anterior = prediccion.CF_anterior,
                P1 = prediccion.P1,
                P2 = prediccion.P2,
                estado = prediccion.estado
            };

            var pred = await _prediccionRepository.Insertar(prediction);

            return Ok(pred);
        }
    }
}