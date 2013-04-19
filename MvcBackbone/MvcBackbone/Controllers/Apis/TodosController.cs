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
    public class TodosController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/Default1
        public IEnumerable<Todo> GetTodoes()
        {
            return db.Todoes.AsEnumerable();
        }

        // GET api/Default1/5
        public Todo GetTodo(int id)
        {
            Todo todo = db.Todoes.Find(id);
            if (todo == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return todo;
        }

        // PUT api/Default1/5
        public HttpResponseMessage PutTodo(int id, Todo todo)
        {
            if (ModelState.IsValid && id == todo.Id)
            {
                db.Entry(todo).State = EntityState.Modified;

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
        public HttpResponseMessage PostTodo(Todo todo)
        {
            HttpResponseMessage response;
            try
            {
                if (ModelState.IsValid)
                {


                    db.Todoes.Add(todo);
                    db.SaveChanges();
                    response = Request.CreateResponse(HttpStatusCode.Created, todo);
                    response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = todo.Id }));

                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                }


            }
            catch (System.Exception ex)
            {
                
                response= Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
          
                return response;
          
                
            
            
        }

        // DELETE api/Default1/5
        public HttpResponseMessage DeleteTodo(int id)
        {
            Todo todo = db.Todoes.Find(id);
            if (todo == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Todoes.Remove(todo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, todo);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}