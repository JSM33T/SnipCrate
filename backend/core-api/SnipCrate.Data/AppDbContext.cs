using Microsoft.EntityFrameworkCore;
using SnipCrate.Data.Entities;
using System;

namespace SnipCrate.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Newsletter> Newsletters { get; set; }
    }

}
