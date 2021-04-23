﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/jokes")]
    [ApiController]
    public class JokeController : ControllerBase
    {

        public static List<Joke> Jokes = new List<Joke>();

        // GET: api/jokes
        [HttpGet]
        public ActionResult Get()
        {
            return new JsonResult(Jokes);
        }

        // GET api/jokes/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            return new JsonResult(Jokes[id]);
        }

        // POST api/jokes
        [HttpPost]
        public void Post([FromBody] Joke joke)
        {
            Jokes.Add(joke);
        }

        // PUT api/jokes/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Joke joke)
        {
            Jokes[id] = joke;
        }

        // DELETE api/jokes/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            Jokes.RemoveAt(id);
        }
    }

    public class Joke
    {
        public string Text { get; set; }
    }


}
