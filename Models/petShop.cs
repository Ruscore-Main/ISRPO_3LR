using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab3ISRPO.Models
{
    public class petShop
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime? DateDelivery { get; set; }
        public int? Price { get; set; }
        public int? Amount { get; set; }
        public string? Image { get; set; }
    }
}
