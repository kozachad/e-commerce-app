using eTicaret.Context;
using eTicaret.DTOs;
using eTicaret.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eTicaret.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController(ApplicationDbContext context) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> PostProduct(ProductDTO request,int userId, CancellationToken cancellationToken)
        {
            Product product = new Product();
            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.UserId = userId;
            //product.Image = request.Image;
            await context.AddAsync(product,cancellationToken);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = context.Products
                .Where(p => p.isDeleted == false)
                .OrderBy(p => p.Id)
                .ToList();

            if (!products.Any())
            {
                return NoContent();
            }

            return Ok(products);
        }


        [HttpGet]
        public IActionResult GetProductsById(int userId)
        {
            var products = context.Products
                .Where(p => p.UserId == userId && p.isDeleted == false)
                .OrderBy(p => p.Id)
                .ToList();

            if (!products.Any())
            {
                return NoContent();
            }

            return Ok(products);
        }

        [HttpPut]
        public IActionResult EditProduct(int id,EditProductDTO request)
        {
            var products = context.Products.Where(p=> p.Id == id).Select(p=> p);

            if (products == null)
            {
                return NoContent();
            }

            var td = products.FirstOrDefault();

            td.Name = request.Name;
            td.Description = request.Description;
            td.Price = request.Price;
            td.Image = request.Image;

            context.SaveChanges();

            return Ok();
        }

        [HttpDelete]
        public IActionResult DeleteProduct(int id)
        {
            var product = context.Products.Where(p=> p.Id == id).Select(p=> p);
            if(product == null)
            {
                return NoContent();
            }
            
            var td = product.FirstOrDefault();

            td.isDeleted = true;

            context.SaveChanges();
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("no file uploaded");
            }

            var filePath = Path.Combine("wwwroot/images", file.FileName);
            using (var stream = new FileStream(filePath,FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl = Url.Content($"~/images/{file.FileName}");
            return Ok(new { url = imageUrl });
        }


        [HttpGet]// bir sıkıntı var ama ankla
        public IActionResult FilterProducts(string? search = null, double? minPrice = null, double? maxPrice = null)
        {
            var products = context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                products = products.Where(p => p.Name.Contains(search));
            }

            if (minPrice.HasValue)
            {
                products = products.Where(p => p.Price >= minPrice.Value);
            }

            if (maxPrice.HasValue)
            {
                products = products.Where(p => p.Price <= maxPrice.Value);
            }

            var result = products.OrderBy(p => p.Id).ToList();

            if (!result.Any())
            {
                return NoContent();
            }
           
            return Ok(result);
        }
    }

}

