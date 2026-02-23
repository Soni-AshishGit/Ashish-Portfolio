var builder = WebApplication.CreateBuilder(args);

var corsPolicyName = "frontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsPolicyName, policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
            {
                if (string.IsNullOrEmpty(origin))
                {
                    return false;
                }

                if (origin.StartsWith("http://localhost:5173", StringComparison.OrdinalIgnoreCase) ||
                    origin.StartsWith("https://localhost:5173", StringComparison.OrdinalIgnoreCase))
                {
                    return true;
                }

                try
                {
                    var host = new Uri(origin).Host;
                    return host.EndsWith(".vercel.app", StringComparison.OrdinalIgnoreCase);
                }
                catch
                {
                    return false;
                }
            })
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    var portValue = Environment.GetEnvironmentVariable("PORT");
    if (!int.TryParse(portValue, out var port))
    {
        port = 8080;
    }

    serverOptions.ListenAnyIP(port);
});

var app = builder.Build();

app.UseCors(corsPolicyName);

app.UseHttpsRedirection();

var cvData = new CvData(
    "Ashish Kumar",
    "Cross-Platform .NET Developer (MVC · MAUI · Blazor · MVVM)",
    "Results-driven Cross-Platform .NET Developer with hands-on experience in building web and mobile applications using .NET MAUI, Blazor, and C#. Skilled in MVVM architecture, RESTful API integration, and database-driven systems. Passionate about writing clean, scalable code and delivering high-quality user experiences across platforms. Proven ability to lead teams, mentor peers, and optimize application performance.",
    new[]
    {
        new Experience(
            "Winlancer Technologies Pvt Ltd | Indore (M.P.)",
            "Dotnet Developer",
            "Feb 2025 - Present",
            "Delivered scalable web and cross-platform applications using C# and .NET MAUI/Blazor. Collaborated in Agile teams, implemented RESTful APIs, integrated third-party services, and optimised application performance to improve user experience.",
            new[] { "C#", ".NET MAUI", "Blazor", "ASP.NET Core", "REST APIs", "SQL Server" }
        ),
        new Experience(
            "TagX Data Solutions | Indore",
            "Data Annotation Specialist & Data Analyst",
            "Aug 2023 - Dec 2025",
            "Managed large-scale annotation projects with 99%+ accuracy for ML datasets. Coordinated with data scientists and ML engineers for dataset optimisation, led a team of annotators, and performed training and quality checks.",
            new[] { "Data Annotation", "ML Datasets", "Quality Control" }
        ),
        new Experience(
            "Bharat Intern | Remote",
            "Web Developer Intern",
            "Mar 2023 - June 2023",
            "Built responsive web applications and a personal portfolio using HTML, CSS, and JavaScript. Gained hands-on experience in UI/UX and front-end frameworks while collaborating with senior developers on live projects.",
            new[] { "HTML", "CSS", "JavaScript" }
        )
    },
    new[]
    {
        new Project(
            "Smart Parking Auction Platform",
            "Web-based parking auction platform for managing and bidding on city parking slots. In progress.",
            "In Progress",
            "",
            new[] { "ASP.NET Core", "Blazor", "SQL Server" }
        ),
        new Project(
            "Unified People & Services Hub",
            "Concept platform combining dating, job posting, system management, and social features into a single experience.",
            "Prototype",
            "",
            new[] { ".NET", "Blazor", "REST APIs" }
        ),
        new Project(
            "Galaxy Strategy Simulation",
            "AI-powered React and Vite game with civilisation-building, role-based gameplay, and real-time galaxy visualisation.",
            "Live",
            "",
            new[] { "React", "Vite", "Framer Motion", "AI" }
        ),
        new Project(
            "Fleet Fuel Ticketing System",
            "Modern truck tracking and fuel ticket management system used for logistics operations.",
            "Live",
            "",
            new[] { "ASP.NET Core", "SQL Server", "REST APIs" }
        ),
        new Project(
            "Last-Mile Delivery Manager",
            "Grocery delivery platform with order tracking, routing, and delivery management.",
            "Live",
            "",
            new[] { ".NET", "Mobile", "REST APIs" }
        ),
        new Project(
            "Digital Health Management Suite",
            "Web-based healthcare management system for digital consultations and health services.",
            "Live",
            "",
            new[] { "ASP.NET Core", "React", "SQL Server" }
        )
    },
    new[]
    {
        new Education(
            "M.C.A Computer Application",
            "Vikram University, Ujjain (Madhya Pradesh) – Institute of Science and Technology. Specialisation in Cross-Platform Applications and Software Development. Core Subjects: Software Engineering, Web Technologies, Cloud Fundamentals. GPA: 7.6.",
            "2021 – 2023 (Completed)"
        ),
        new Education(
            "Bachelor of Science in Computer Science",
            "Rajeev Gandhi P. G. College, Mandsaur (Madhya Pradesh). Academic Focus: Data Structures, OOP, DBMS, Operating Systems. Practical Exposure: C/C++, SQL-based assignments, logical problem-solving. GPA: 7.0.",
            "2019 – 2021 (Completed)"
        )
    },
    new[]
    {
        new Award(
            "Most Rapid Career Growth (TagX)",
            "Awarded \"Employee of the Year\" for exceptional dedication and performance.",
            "TagX Data Solutions"
        ),
        new Award(
            "Dedicated Team Leader (Winlancer Technologies)",
            "Recognised for leading teams effectively and delivering successful projects.",
            "Winlancer Technologies"
        )
    },
    new[]
    {
        new Certification(
            ".NET MAUI & Blazor Mastery",
            "Advanced online training and projects focused on cross-platform .NET development."
        ),
        new Certification(
            "RESTful API Development",
            "Hands-on course building RESTful APIs with C# and .NET."
        ),
        new Certification(
            "HackerRank Problem Solving",
            "Certified for algorithm and data structure problem solving challenges."
        ),
        new Certification(
            "React + Vite Fundamentals",
            "Completed interactive web development projects using React and Vite."
        )
    },
    new[]
    {
        new Hobby(
            "Guitar & Music",
            "Playing and composing music."
        ),
        new Hobby(
            "Gaming & AI Projects",
            "Exploring AI-powered games and simulations."
        ),
        new Hobby(
            "Writing & Blogging",
            "Writing tech blogs and content about coding and software."
        )
    },
    new HologramMetadata(
        "/ashish-hologram.png",
        "galaxy-hologram",
        "online"
    ),
    new BuyMeTeaMetadata(
        true,
        "Support my work with a virtual tea.",
        "Buy me a Tea"
    )
);

app.MapGet("/api/cv", () => cvData)
    .WithName("GetCv");

app.Run();

record CvData(
    string Name,
    string Title,
    string Summary,
    Experience[] Experience,
    Project[] Projects,
    Education[] Education,
    Award[] Awards,
    Certification[] Certifications,
    Hobby[] Hobbies,
    HologramMetadata Hologram,
    BuyMeTeaMetadata BuyMeTea
);

record Experience(
    string Company,
    string Role,
    string Period,
    string Description,
    string[] Technologies
);

record Project(
    string Name,
    string Description,
    string Status,
    string LiveUrl,
    string[] Technologies
);

record Education(
    string Degree,
    string Description,
    string Period
);

record Award(
    string Title,
    string Description,
    string Issuer
);

record Certification(
    string Title,
    string Description
);

record Hobby(
    string Title,
    string Description
);

record HologramMetadata(
    string AvatarUrl,
    string Theme,
    string Status
);

record BuyMeTeaMetadata(
    bool Enabled,
    string Message,
    string ButtonLabel
);
