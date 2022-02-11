﻿using Microsoft.EntityFrameworkCore;

namespace BCATPAngular8EFSQlite.Models
{
    public partial class BCATPDBContext : DbContext
    {
        public BCATPDBContext()
        {
        }

        public BCATPDBContext(DbContextOptions<BCATPDBContext> options)
            : base(options)
        {
        }
        public virtual DbSet<TblBcatp> TblBcatp { get; set; }
        public virtual DbSet<TblNavy> TblNavy { get; set; }
        public virtual DbSet<TblDewline> TblDewline { get; set; }
        public virtual DbSet<TblPinetree> TblPinetree { get; set; }
        public virtual DbSet<TblMidCanada> TblMidCanada { get; set; }
        public virtual DbSet<TblAirforce> TblAirforce { get; set; }
        public virtual DbSet<TblArmy> TblArmy { get; set; }
        public virtual DbSet<TblDefunct> TblDefunct { get; set; }
        public virtual DbSet<TblTanks> TblTanks { get; set; }
        public virtual DbSet<TblPlanes> TblPlanes { get; set; }
        public virtual DbSet<TblShips> TblShips { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblBcatp>().ToTable("bcatp");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblNavy>().ToTable("navy");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblDewline>().ToTable("dewline");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblPinetree>().ToTable("pinetree");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblMidCanada>().ToTable("midcanada");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblAirforce>().ToTable("airforce");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblArmy>().ToTable("army");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblDefunct>().ToTable("defunct");
            OnModelCreatingPartial(modelBuilder);

            modelBuilder.Entity<TblTanks>().ToTable("Tanks");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblPlanes>().ToTable("Planes");
            OnModelCreatingPartial(modelBuilder);
            modelBuilder.Entity<TblShips>().ToTable("Ships");
            OnModelCreatingPartial(modelBuilder);    
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}