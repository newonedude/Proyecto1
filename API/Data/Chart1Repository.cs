using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Chart1Repository:IChart1Repository
    {
        private readonly DataContext context;
        public Chart1Repository(DataContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Chart1>> GetChart1bySeccion(string seccion)
        {
            var result = from a in context.chart_1
                         where a.seccion == seccion
                         select a;

            return await result.ToListAsync();
        }

        public async Task<IEnumerable<Chart1>> GetChart1Async()
        {
            return await context.chart_1.ToListAsync();
        }

        public async Task<IEnumerable<Chart1>> GetChart1byGrado(string grado)
        {
            var result = from a in context.chart_1
                         where a.grado == grado
                         select a;

            return await result.ToListAsync();
        }
    }
}