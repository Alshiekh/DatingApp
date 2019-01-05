using System.ComponentModel.DataAnnotations;

namespace DatingApp.Api.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string username { get; set; }


         [Required]
         [StringLength(8,MinimumLength=4,ErrorMessage="you must specify password between 4 and 8 charcter")]
        public string password { get; set; }
    }
}