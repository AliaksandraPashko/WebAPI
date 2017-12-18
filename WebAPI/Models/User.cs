using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Укажите имя пользователя")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Укажите фамилию пользователя")]
        public string LastName { get; set; }
        public string Info { get; set; }
        public string Photourl { get; set; }
    }
}
