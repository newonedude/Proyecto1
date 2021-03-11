using System.Threading.Tasks;
using API.DTO;
using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(Usuario usuario);
    }
}