using BCATPAngular8EFSQlite.DataAccess;
using BCATPAngular8EFSQlite.Interfaces;
using BCATPAngular8EFSQlite.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BCATPAngular8EFSQlite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddRazorRuntimeCompilation();

            services.AddTransient<IBcatp, BcatpDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<INavy, NavyDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IDewline, DewlineDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IPinetree, PinetreeDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IMidCanada, MidCanadaDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IAirforce, AirforceDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IArmy, ArmyDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IDefunct, DefunctDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<ITanks, TanksDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IPlanes, PlanesDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddTransient<IShips, ShipsDataAccessLayer>();
            services.AddDbContext<BCATPDBContext>(options => options.UseSqlite(Configuration["ConnectionStrings:DefaultConnection"]));

            ////var clientDomain = Configuration.GetValue<string>("ClientDomain");
            ////services.AddCors(cfg => cfg.AddPolicy("ClientDomain", builder => builder.WithOrigins(clientDomain)));
            services.AddMvc(options => options.EnableEndpointRouting = false);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
                //app.Use(async (context, next) =>
                //{
                //    await next();
                //    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
                //    {
                //        context.Request.Path = "/index.html";
                //        await next();
                //    }
                //});                 
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            ////app.UseCors("ClientDomain");
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    //     spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    spa.UseAngularCliServer(npmScript: "start");
                }

            });
        }
    }
}
