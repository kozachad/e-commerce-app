using eTicaret.Context;
using eTicaret.DTOs;
using eTicaret.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eTicaret.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController(ApplicationDbContext context) : ControllerBase
    {

        [HttpGet]
        public List<Product> GetMyItems(int userId)
        {
            var cart = context.Carts
                .Include(c => c.Products)
                .FirstOrDefault(c => c.userId == userId);

            if (cart == null)
            {
                return new List<Product>();
            }


            return cart.Products.Where(p=> p.isDeleted == false).ToList();
        }

        [HttpPost]
        public IActionResult AddToCart(AddToCartDTO request)
        {
            var cart = context.Carts
                .Include(c => c.Products)
                .FirstOrDefault(c => c.userId == request.UserId);

            if (cart == null)
            {
                cart = new Cart
                {
                    userId = request.UserId,
                    Products = new List<Product>()
                };

                context.Carts.Add(cart);
            }

            var product = context.Products.Find(request.ProductId);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            if (!cart.Products.Contains(product))
            {
                cart.Products.Add(product);
                context.SaveChanges();
            }

            return Ok(product);
        }

        [HttpPost]
        [Route("DeleteProduct")]
        public IActionResult Delete(DeleteProductInCard request)
        {
            var cart = context.Carts
                .Include(c => c.Products)
                .FirstOrDefault(c=> c.userId == request.userId);

            if (cart == null)
            {
                return BadRequest();
            }

            var product = context.Products.Find(request.productId);

            if (product != null)
            {
                cart.Products.Remove(product);
                context.SaveChanges();
            }

            return Ok();
        }


        /*[HttpPost("AddToCart")]
        public IActionResult AddToCart([FromBody] AddToCartDTO product)
        {
            var cart = context.Carts.Include(c => c.CartProducts)
                .ThenInclude(cp=> cp.Product)
                .FirstOrDefault(c => c.userId == product.UserId);
            if (cart == null)
            {
                cart = new Cart { userId = product.UserId, CartProducts = new List<CartProduct>() };
                context.Carts.Add(cart);
            }

            var existingProduct = cart.CartProducts
            .FirstOrDefault(cp => cp.ProductId == product.ProductId);

            if (existingProduct == null)
            {
                var prod = context.Products.Find(product.ProductId);
                if (prod == null)
                {
                    return NotFound("Product not found");
                }
                var cartProduct = new CartProduct
                {
                    Car
                    Product = prod
                };
                cart.CartProducts.Add(cartProduct);
            }
            
            context.SaveChanges();
            return Ok(cart);
        }*/
        /*
        [HttpGet("{userId}")]
        public  IActionResult GetCart(int userId)
        {
            var cart = context.Carts.Include(c=> c.Products)
                .FirstOrDefault(c=> c.userId == userId);

            if(cart == null) return NotFound();

            return Ok(cart);
        }*/
    }
}
