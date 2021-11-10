using System.Security.AccessControl;
namespace API.DTO
{
    public class Sms
    {
        public string typeSMS { get; set; }
        public string receiverPhoneNumber { get; set; }
        public short id_matricula { get; set; }
        public string nombreAlumno { get; set; }
        public string fecha_asesoria { get; set; }
        public string hora_asesoria { get; set; }
        public string scored_labels { get; set; }
        public decimal scored_probabilities { get; set; }
    }
}