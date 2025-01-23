## Project Overview
A comprehensive .NET project management application, designed to track and manage projects, customers, and services.

## Technologies
- .NET Core C#
- Entity Framework Core
- SOLID Principles

## Prerequisites
- .NET SDK 9.0+
- Visual Studio 2022 or VS Code or JB Rider
- SQL Server

## Setup Instructions
1. Clone the repository
2. Update or add default connection string in `appsettings.json`
    ````Json
    {
      "ConnectionStrings": {
        "DefaultConnection": "<Your Connection String Here>"
      }
    }
   ````

4. Run database migrations
   ```bash
   dotnet ef database update
   ```
5. Build and run the project

## Project Structure
- `Data/`: Data access layer
- `Service/`: Business logic
- `Api.Main/`: Api for access
- `ReactUi/`: Frontend application
