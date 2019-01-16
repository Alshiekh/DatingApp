using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.Api.Models;

namespace DatingApp.Api.Data
{
    public interface IAuthoRepository
    {
         Task<User> Register(User user , string password);
         Task<User> Login(string username , string password);
          Task<bool> UserExist(string username);
         Task<List<User>> GetUsers();
    }
}