## Project Overview
A comprehensive .NET project management application, designed to track and manage projects.
There is also a way of managing Services, Statuses, Customers and Project Managers

## Technologies
- .NET Core C#
- Entity Framework Core
- SOLID Principles
- React with Material UI

## Prerequisites
- .NET SDK 9.0+
- Visual Studio 2022 or VS Code or JB Rider
- SQL Server
- Node > 21.x

## Setup Instructions
1. Clone the repository
2. Setup a SQL Server Database
3. Update or add default connection string in `appsettings.json`
    ````Json
    {
        "ConnectionStrings": {
            "EcwProjectManagerDb": "<Your Connection String Here>"
        }

        "ProjectManagerApiKey": {
            "Key": "<API-KEY>",
            "IsActive": true
        }
    }
   ````
    OR
   Add Enviroment Variable: ASPNETCORE_ConnectionStrings__EcwProjectManagerDb=connStr
    
5. Run database migrations
   ```bash
   dotnet ef database update
   ```
   
6. Add Options.js to UI.Reac.Mui / src / Helpers with the following content
    ````Javascript
    export const Options = {
        apiBaseUrl: "<URL to API",
        apiKey: "<API Key>"
    }
   ````
    
7. Build and run the project
    ```bash
    npm install
    npm run dev    
   ```


## Project Structure
- `Data/`: Data access layer
- `Service/`: Business logic
- `Api.Main/`: Api for access
- `ReactUi/`: Frontend application
