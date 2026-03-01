# Structure Overview

The Epstein files are hosted on [justice.gov](https://justice.gov/), the official website of the USA's Department of Justice.

The following Diagramm gives an overview over the Server structure:

```mermaid
flowchart TB

%% USER
User((User))

%% justice.gov
subgraph JusticeLayer["justice.gov"]
    DNS[DNS / Server Resolution]
end

User --> DNS
DNS --> AkamaiProt[Akamai Protection]

%% ENDPOINTS
subgraph Endpoints["Endpoints"]
    PathPages[/Dataset Pages/]
    PathSearch[/Search/]
    PathFiles[/Files/]
end

AkamaiProt --> PathPages
AkamaiProt --> PathSearch
AkamaiProt --> QueueIt[Queue-it Protection]
QueueIt --> PathFiles

%% SERVERS
PathPages --> Nginx[Drupal 10 Nginx Server]
PathSearch --> Nginx
PathFiles --> AkamaiCDN[Akamai CDN]

AkamaiCDN <--> AWS[AWS]

%% DOJ NETWORK
subgraph DOJNet["Internal DOJ Network"]
    DOJPC[DOJ Desktop PC]
    ConcServer[Concordance Server]
    DOJPC -->|Raw files| ConcServer
end

DOJPC -. Dataset Index .-> PathPages
ConcServer -->|Deployment| AkamaiCDN
ConcServer -. Search Index .-> PathSearch

OtherAgencies[Other Agencies] -.->|Files| DOJPC
```