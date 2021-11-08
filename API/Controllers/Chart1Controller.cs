using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class Chart1Controller:APIBaseController
    {
        private readonly IChart1Repository _chart1Repository;
        public Chart1Controller(IChart1Repository chart1Repository)
        {
            _chart1Repository = chart1Repository;
        }

        [HttpGet("seccion/{seccion}")]
        public async Task<ActionResult<Chart1>> GetChart1BySeccion(string seccion)
        {
            var chartt = await _chart1Repository.GetChart1bySeccion(seccion);
            return Ok(chartt);
        }

        [HttpGet]
        public async Task<ActionResult<Chart1>> GetChart1()
        {
            var chartt1 = await _chart1Repository.GetChart1Async();

            return Ok(chartt1);
        }

        [HttpGet("grado/{grado}")]
        public async Task<ActionResult<Chart1>> GetChart1ByGrado(string grado)
        {
            var chartt = await _chart1Repository.GetChart1byGrado(grado);
            return Ok(chartt);
        }
    }
}