using System.Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Json;
using System.Web;

namespace API.Controllers
{
    public class modelsConsumptionController : APIBaseController
    {
        public modelsConsumptionController()
        {

        }

        [HttpPost("forecastModel1")]
        public async Task<ActionResult<object>> RealizarPrediccion1(DataEncuesta dataEncuesta)
        {
            var handler = new HttpClientHandler()
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback =
                        (httpRequestMessage, cert, cetChain, policyErrors) => { return true; }
            };

            using (var client = new HttpClient(handler))
            {
                //Request data
                var scoreRequest = new
                {
                    Inputs = new Dictionary<string, List<Dictionary<string, string>>>()
                {
                    {
                        "WebServiceInput0",
                        new List<Dictionary<string, string>>()
                        {
                            new Dictionary<string, string>()
                            {
                                    {
                                        "edad", dataEncuesta.edad
                                    },
                                    {
                                        "edu_padre", dataEncuesta.edu_padre
                                    },
                                    {
                                        "tam_familia", dataEncuesta.tam_familia
                                    },
                                    {
                                        "apoderado", dataEncuesta.apoderado
                                    },
                                    {
                                        "cal_materiales", dataEncuesta.cal_materiales
                                    },
                                    {
                                        "cal_rela_docente", dataEncuesta.cal_rela_docente
                                    },
                                    {
                                        "apoyo_fam_curso", dataEncuesta.apoyo_fam_curso
                                    },
                                    {
                                        "mot_interes", dataEncuesta.mot_interes
                                    },
                                    {
                                        "nivel_interes", dataEncuesta.nivel_interes
                                    },
                                    {
                                        "C_Final_Primero", dataEncuesta.C_Final_Primero
                                    }
                            }
                        }
                    },
                },
                    GlobalParameters = new Dictionary<string, string>()
                    {
                    }
                };

                const string apiKey = "PW86cg9A8afpRgtfIS6j7pq7ReyRsS8s";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                client.BaseAddress = new Uri("http://5b32150c-2ad2-4e41-b895-44a9722f4991.eastus.azurecontainer.io/score");

                var requestString = JsonConvert.SerializeObject(scoreRequest);
                var content = new StringContent(requestString);

                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                HttpResponseMessage response = await client.PostAsync("", content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();

                    var text = result.Replace("Scored Labels", "Scored_Labels");
                    var text2 = text.Replace("Scored Probabilities", "Scored_Probabilities");

                    forecast_response json = JsonConvert.DeserializeObject<forecast_response>(text2);

                    return new HttpStatusCodeException(HttpStatusCode.OK, "Predicción Realizada", json);
                }
                else
                {
                    return new HttpStatusCodeException(HttpStatusCode.BadRequest, "Ha ocurrido un error", null);
                }

            }
        }

        [HttpPost("forecastModel4")]
        public async Task<ActionResult<object>> RealizarPrediccion4(DataEncuesta dataEncuesta)
        {
            var handler = new HttpClientHandler()
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback =
                        (httpRequestMessage, cert, cetChain, policyErrors) => { return true; }
            };

            using (var client = new HttpClient(handler))
            {
                //Request data
                var scoreRequest = new
                {
                    Inputs = new Dictionary<string, List<Dictionary<string, string>>>()
                {
                    {
                        "WebServiceInput0",
                        new List<Dictionary<string, string>>()
                        {
                            new Dictionary<string, string>()
                            {
                                    {
                                        "edad", dataEncuesta.edad
                                    },
                                    {
                                        "edu_padre", dataEncuesta.edu_padre
                                    },
                                    {
                                        "tam_familia", dataEncuesta.tam_familia
                                    },
                                    {
                                        "apoderado", dataEncuesta.apoderado
                                    },
                                    {
                                        "cal_materiales", dataEncuesta.cal_materiales
                                    },
                                    {
                                        "cal_rela_docente", dataEncuesta.cal_rela_docente
                                    },
                                    {
                                        "horas_estudio", dataEncuesta.horas_estudio
                                    },
                                    {
                                        "apoyo_fam_curso", dataEncuesta.apoyo_fam_curso
                                    },
                                    {
                                        "mot_interes", dataEncuesta.mot_interes
                                    },
                                    {
                                        "nivel_interes", dataEncuesta.nivel_interes
                                    },
                                    {
                                        "T1_Segundo", dataEncuesta.T1_Segundo
                                    }
                            }
                        }
                    },
                },
                    GlobalParameters = new Dictionary<string, string>()
                    {
                    }
                };

                const string apiKey = "u0mdgFg6ibaCc8p7P58ZpQFq40Ng4mYV";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                client.BaseAddress = new Uri("http://c81059cb-e40c-4d74-bb65-dfda04bb89b6.eastus.azurecontainer.io/score");

                var requestString = JsonConvert.SerializeObject(scoreRequest);
                var content = new StringContent(requestString);

                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                HttpResponseMessage response = await client.PostAsync("", content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();

                    var text = result.Replace("Scored Labels", "Scored_Labels");
                    var text2 = text.Replace("Scored Probabilities", "Scored_Probabilities");

                    forecast_response json = JsonConvert.DeserializeObject<forecast_response>(text2);

                    return new HttpStatusCodeException(HttpStatusCode.OK, "Predicción Realizada", json);
                }
                else
                {
                    return new HttpStatusCodeException(HttpStatusCode.BadRequest, "Ha ocurrido un error", null);
                }
            }
        }

        [HttpPost("forecastModel5")]
        public async Task<ActionResult<object>> RealizarPrediccion5(DataEncuesta dataEncuesta)
        {
            var handler = new HttpClientHandler()
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback =
                        (httpRequestMessage, cert, cetChain, policyErrors) => { return true; }
            };

            using (var client = new HttpClient(handler))
            {
                //Request data
                var scoreRequest = new
                {
                    Inputs = new Dictionary<string, List<Dictionary<string, string>>>()
                {
                    {
                        "WebServiceInput0",
                        new List<Dictionary<string, string>>()
                        {
                            new Dictionary<string, string>()
                            {
                                    {
                                        "edad", dataEncuesta.edad
                                    },
                                    {
                                        "edu_padre", dataEncuesta.edu_padre
                                    },
                                    {
                                        "tam_familia", dataEncuesta.tam_familia
                                    },
                                    {
                                        "apoderado", dataEncuesta.apoderado
                                    },
                                    {
                                        "cal_materiales", dataEncuesta.cal_materiales
                                    },
                                    {
                                        "cal_rela_docente", dataEncuesta.cal_rela_docente
                                    },
                                    {
                                        "horas_estudio", dataEncuesta.horas_estudio
                                    },
                                    {
                                        "apoyo_fam_curso", dataEncuesta.apoyo_fam_curso
                                    },
                                    {
                                        "mot_interes", dataEncuesta.mot_interes
                                    },
                                    {
                                        "nivel_interes", dataEncuesta.nivel_interes
                                    },
                                    {
                                        "T1_Segundo", dataEncuesta.T1_Segundo
                                    },
                                    {
                                        "T2_segundo", dataEncuesta.T2_segundo
                                    }
                            }
                        }
                    },
                },
                    GlobalParameters = new Dictionary<string, string>()
                    {
                    }
                };

                const string apiKey = "65YMYnEwNFauSTj8nEaTajrMvz8p2cDh";
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
                client.BaseAddress = new Uri("http://bd2161ca-e943-4c60-b343-9d18028eb24d.eastus.azurecontainer.io/score");

                var requestString = JsonConvert.SerializeObject(scoreRequest);
                var content = new StringContent(requestString);

                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                HttpResponseMessage response = await client.PostAsync("", content);

                if (response.IsSuccessStatusCode)
                {
                    string result = await response.Content.ReadAsStringAsync();

                    var text = result.Replace("Scored Labels", "Scored_Labels");
                    var text2 = text.Replace("Scored Probabilities", "Scored_Probabilities");

                    forecast_response json = JsonConvert.DeserializeObject<forecast_response>(text2);

                    return new HttpStatusCodeException(HttpStatusCode.OK, "Predicción Realizada", json);
                }
                else
                {
                    return new HttpStatusCodeException(HttpStatusCode.BadRequest, "Ha ocurrido un error", null);
                }
            }
        }
    }
}