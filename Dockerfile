# Base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["eTicaret_Sln/eTicaret/eTicaret.csproj", "eTicaret_Sln/eTicaret/"]
RUN dotnet restore "eTicaret_Sln/eTicaret/eTicaret.csproj"
COPY . .
WORKDIR "/src/eTicaret_Sln/eTicaret"
RUN dotnet build "eTicaret.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "eTicaret.csproj" -c Release -o /app/publish

# Final stage
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "eTicaret.dll"]
