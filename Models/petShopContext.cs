using Microsoft.EntityFrameworkCore;

namespace Lab3ISRPO.Models
{
    public class petShopContext : DbContext
    {
        public DbSet<petShop> petShops { get; set; }
        public petShopContext(DbContextOptions<petShopContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
