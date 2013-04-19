using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcBackbone.Models;

namespace MvcBackbone.Controllers
{
    public class ToDoController : Controller
    { 

        public ActionResult Index()
        {
            return View();
        }

        

     
    }
}