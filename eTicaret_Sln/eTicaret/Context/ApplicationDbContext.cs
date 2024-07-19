using eTicaret.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;

namespace eTicaret.Context
{
    public sealed class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        { 

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name);
                entity.Property(e => e.Password);
                entity.Property(e => e.Salt);
                entity.Property(e => e.Avatar);
                entity.Property(e => e.Status);
                entity.Property(e => e.Role);
                entity.Property(e => e.refreshToken);
                entity.Property(e => e.ExpiryDate);

                entity.HasOne(e=> e.Cart)
                .WithOne(c=> c.user)
                .HasForeignKey<Cart>(c=> c.userId);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("product");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name);
                entity.Property(e=> e.Description);
                entity.Property(e=> e.Price);
                entity.Property(e => e.Image);
                entity.Property(e => e.isDeleted);
                entity.HasOne(d => d.user)
                .WithMany(p => p.Products)
                .HasForeignKey(d => d.UserId);
                
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("carts");

                entity.HasKey(e => e.Id);
                entity.Property(e=> e.userId);
                //entity.Property(e => e.ProductId);

                entity.HasOne(e => e.user)
                .WithOne(u => u.Cart)
                .HasForeignKey<Cart>(e => e.userId);


                entity.HasMany(e => e.Products)
                      .WithMany(p => p.Carts)
                      .UsingEntity<Dictionary<string, object>>(
                          "CartProducts",
                          j => j.HasOne<Product>().WithMany().HasForeignKey("ProductId"),
                          j => j.HasOne<Cart>().WithMany().HasForeignKey("CartId"),
                          j =>
                          {
                              j.HasKey("CartId", "ProductId");
                              j.ToTable("CartProducts");
                          });

            });

            base.OnModelCreating(modelBuilder);




        }


    }
}
