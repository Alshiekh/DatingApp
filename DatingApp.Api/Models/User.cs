using System;
using System.Collections.Generic;

namespace DatingApp.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string Gender { get; set; }

        public DateTime BirthDate { get; set; }
        public string KnownAs { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastAction { get; set; }

        public string introduction { get; set; }
        public string LookingFor { get; set; }
        public string Intrests { get; set; }

        public string City { get; set; }
        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}