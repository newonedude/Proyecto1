using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace API.Services
{
    public class HttpStatusCodeException : Exception
    {
        public HttpStatusCode Status { get; private set; }
        public string Message { get; private set; }
        public object Data { get; private set; }

        public HttpStatusCodeException(HttpStatusCode status, string msg, object data) : base(msg)
        {
            Status = status;
            Message = msg;
            Data = data;
        }
    }
}