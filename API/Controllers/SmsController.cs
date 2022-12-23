using System;
using System.Threading.Tasks;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace API.Controllers
{
    public class SmsController : APIBaseController
    {
        public SmsController()
        {

        }

        [HttpPost("sendSMS")]
        public ActionResult Index(Sms sms)
        {
            var newsms = new Sms
            {
                receiverPhoneNumber = sms.receiverPhoneNumber,
                id_matricula = sms.id_matricula,
                nombreAlumno = sms.nombreAlumno,
                fecha_asesoria = sms.fecha_asesoria,
                hora_asesoria = sms.hora_asesoria,
                typeSMS = sms.typeSMS,
                scored_labels = sms.scored_labels,
                scored_probabilities = sms.scored_probabilities
            };

            var accountSid = "AC84eab1496a029dfbcfaa4fbc4391e636";
            var authToken = "27577d3e56d5935bf731a60a8babdf84";
            TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
                new PhoneNumber(newsms.receiverPhoneNumber));
            messageOptions.MessagingServiceSid = "MGdba1fbda003fe9d4c2f9d4e687a2d805";

            if (newsms.typeSMS == "asesoria")
            {
                messageOptions.Body = "Se ha registrado una Asesoría a su menor hijo "
                + newsms.nombreAlumno
                + " para el día "
                + newsms.fecha_asesoria
                + " a las "
                + newsms.hora_asesoria;
            }
            else if (newsms.typeSMS == "autorizacion")
            {
                messageOptions.Body = "Su menor hijo está solicitando su autorización para responder un cuestionario en línea para conocer la predicción de su rendimiento académico en Matemáticas. Para leer las políticas de privacidad y dar su autorización ingrese a http://localhost:4200/?id_matricula=" + newsms.id_matricula;
            }
            else if (newsms.typeSMS == "notificacionPadre")
            {
                if (newsms.scored_labels == "Si")
                {
                    if (newsms.scored_probabilities >= 70)
                    {
                        messageOptions.Body = "Su menor hijo "
                        + newsms.nombreAlumno
                        + " ha llenado nuestra encuesta para conocer su predicción del rendimiento académico en Matemáticas. De acuerdo al récord histórico de notas y a los factores extra académicos, hay un " + newsms.scored_probabilities + "% de probabilidades de que APRUEBE el curso.";
                    }
                    else if (newsms.scored_probabilities >= 50)
                    {
                        messageOptions.Body = "Su menor hijo "
                        + newsms.nombreAlumno
                        + " ha llenado nuestra encuesta para conocer su predicción del rendimiento académico en Matemáticas. De acuerdo al récord histórico de notas y a los factores extra académicos, hay un " + newsms.scored_probabilities + "% de probabilidades de que APRUEBE el curso. Le recomendamos estar atento a la progresión de sus notas";
                    }
                }
                else
                {
                    messageOptions.Body = "Su menor hijo "
                        + newsms.nombreAlumno
                        + " ha llenado nuestra encuesta para conocer su predicción del rendimiento académico en Matemáticas. De acuerdo al récord histórico de notas y a los factores extra académicos, hay un " + newsms.scored_probabilities + "% de probabilidades de que DESAPRUEBE el curso. Le recomendamos que el alumno asista a las asesorías de reforzamiento";
                }
            }


            var message = MessageResource.Create(messageOptions);
            return Content((message.Status).ToString());
        }
    }
}