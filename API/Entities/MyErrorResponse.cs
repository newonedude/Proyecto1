using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class MyErrorResponse
    {
        public string Type { get; set; }
        public string Message { get; set; }
        public string StackTrace { get; set; }
        public object Data { get; set; }

        public MyErrorResponse(Exception ex)
        {
            Type = ex.GetType().Name;
            Message = ex.Message;
            Data = ex.Data;
            StackTrace = ex.ToString();
        }
    }
}