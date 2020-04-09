using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        private static List<Item> _items = new List<Item>();

        public ValuesController()
        {
            for (int i = 0; i < 1000; i++)
            {
                _items.Add(new Item() { Id = Guid.NewGuid().ToString(), Value = GetRandomString() });
            }
        }

        [HttpGet]
        public IActionResult GetValues([FromQuery] Filter filter)
        {
            return Ok(_items.Skip(filter.Skip).Take(filter.Take));
        }

        private string GetRandomString()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new String(stringChars);
        }
    }

    public class Item
    {
        public string Id { get; set; }
        public string Value { get; set; }
    }

    public class Filter
    {
        public int Skip { get; set; }
        public int Take { get; set; } = 50;
    }
}
