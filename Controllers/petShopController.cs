using Lab3ISRPO.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab3ISRPO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class petShopController : ControllerBase
    {
        private petShopContext? _db;
        public petShopController(petShopContext petShopContext)
        {
            _db = petShopContext;
        }


        // GET: api/<petShopController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<petShop>>> Get()
        {
            return await _db.petShops.ToListAsync(); ;
        }
        // GET api/<petShopController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<petShop>> Get(int id)
        {
            petShop petShop = await _db.petShops.FirstOrDefaultAsync(x => x.Id == id);
            if (petShop == null)
                return NotFound();
            return new ObjectResult(petShop);
        }
        // POST api/<petShopController>
        [HttpPost]
        public async Task<ActionResult<petShop>> Post(petShop petShop)
        {
            if (petShop == null)
            {
                return BadRequest();
            }
            _db.petShops.Add(petShop);
            await _db.SaveChangesAsync();
            return Ok(petShop);
        }
        // PUT api/<petShopController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<petShop>> Put(petShop petShop)
        {
            if (petShop == null)
            {
                return BadRequest();
            }
            if (!_db.petShops.Any(x => x.Id == petShop.Id))
            {
                return NotFound();
            }

            _db.Update(petShop);
            await _db.SaveChangesAsync();
            return Ok(petShop);
        }
        // DELETE api/<petShopController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<petShop>> Delete(int id)
        {
            petShop petShop = _db.petShops.FirstOrDefault(x => x.Id == id);
            if (petShop == null)
            {
                return NotFound();
            }
            _db.petShops.Remove(petShop);
            await _db.SaveChangesAsync();
            return Ok(petShop); ;

        }
    }
}