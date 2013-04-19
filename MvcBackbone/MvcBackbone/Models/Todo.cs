using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcBackbone.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Order { get; set; }
        public bool Done { get; set; }
    }
}