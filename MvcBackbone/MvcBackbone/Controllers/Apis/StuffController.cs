using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MvcBackbone.Models;

namespace MvcBackbone.Controllers.Apis
{
    public class StuffController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/Default1
        public IEnumerable<Stuff> GetStuffes()
        {
            return db.Stuffs.AsEnumerable();
        }

        // GET api/Default1/5
        public Stuff GetStuff(int id)
        {
            Stuff stuff = db.Stuffs.Find(id);
            if (stuff == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return stuff;
        }

        // PUT api/Default1/5
        public HttpResponseMessage PutStuff(int id, Stuff stuff)
        {
            if (ModelState.IsValid && id == stuff.Id)
            {
                db.Entry(stuff).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/Default1
        public HttpResponseMessage PostStuff(Stuff stuff)
        {
            if (ModelState.IsValid)
            {
                db.Stuffs.Add(stuff);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, stuff);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = stuff.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/Default1/5
        public HttpResponseMessage DeleteStuff(int id)
        {
            Stuff stuff = db.Stuffs.Find(id);
            if (stuff == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Stuffs.Remove(stuff);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, stuff);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}