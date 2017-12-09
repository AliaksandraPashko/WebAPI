﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        UsersContext db;
        public UsersController(UsersContext context)
        {
            this.db = context;
            if (!db.Users.Any())
            {
                db.Users.Add(new Models.User { FirstName = "Nikita", LastName = "Pashko", info = "16 y.o.", photourl = "..."});
                db.Users.Add(new Models.User { FirstName = "Aliaksandra", LastName = "Pashko", info = "19 y.o.", photourl = "..." });
                db.SaveChanges();
            }
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                return NotFound();
            return new ObjectResult(user);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            db.Users.Add(user);
            db.SaveChanges();
            return Ok(user);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var item = db.Users.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                return NotFound();
            }

            item.FirstName = user.FirstName;
            item.LastName = user.LastName;
            item.info = user.info;
            item.photourl = user.photourl;
            db.Update(item);
            db.SaveChanges();
            return Ok(user);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            User user = db.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();
            return Ok(user);
        }
    }
}
