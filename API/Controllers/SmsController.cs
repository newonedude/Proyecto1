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
                typeSMS = sms.typeSMS
            };

            var accountSid = "AC6d346530225ed568307016c3536f6ad9";
            var authToken = "5603a6c7e16d38c99239384330ec2b9c";
            TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
                new PhoneNumber(newsms.receiverPhoneNumber));
            messageOptions.MessagingServiceSid = "MGcbc38a893dd699757cd31dbea5a8c645";

            if (sms.typeSMS == "asesoria")
            {
                messageOptions.Body = "Se ha registrado una Asesoría a su menor hijo "
                + sms.nombreAlumno
                + " para el día "
                + sms.fecha_asesoria
                + " a las "
                + sms.hora_asesoria;
            }
            else if (sms.typeSMS == "autorizacion")
            {
                messageOptions.Body = "ingresa a http://localhost:4200/?id_matricula=" + sms.id_matricula;
            }


            var message = MessageResource.Create(messageOptions);
            return Content((message.Status).ToString());
        }
    }
}