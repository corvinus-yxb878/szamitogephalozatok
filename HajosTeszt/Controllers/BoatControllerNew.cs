using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoatControllerNew : ControllerBase
    {
        [HttpGet]
        [Route("questions/{sorszám}")]
        public ActionResult M2(int sorszám)
        {
            HajostesztContext context = new HajostesztContext();
            var kérdés = (from x in context.Questions
                          where x.QuestionId == sorszám
                          select x).FirstOrDefault();

            if (kérdés == null) return BadRequest("Nincs ilyen sorszámú kérdés");

            return new JsonResult(kérdés);
        }
       
        function kérdésBetöltés(id)
        {
            fetch(`/ questions /${ id}`)
        .then(válaszfeldolgozás)
        .then(kérdésMegjelenítés);
        }


        function válaszfeldolgozás(válasz)
        {
            if (!válasz.ok)
            {
                console.error(`Hibás válasz: ${ response.status}`)
    }
            else
            {
                return válasz.json()
            }
        }
























    }
}
