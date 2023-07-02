FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ConnectionStrings:Default

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["CentralStation/CentralStation.csproj", "CentralStation/"]
RUN dotnet restore "CentralStation/CentralStation.csproj"
COPY . .
WORKDIR "/src/CentralStation"
RUN dotnet build "CentralStation.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CentralStation.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CentralStation.dll"]
