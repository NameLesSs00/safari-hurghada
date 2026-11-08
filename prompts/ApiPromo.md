for the next part is the promocode that we should be adding in the admin pages and we will be uisng it later in the app as a clinet the most important things is the creating for the prompos here is how it works
{
  "discountEuro": null,
  "discountpercent": 10,
  "limited": 2,
  "tripId": null
}
the prompo could either be % baise or euro baised if we put a number in one the other should be null and the next things is the tripId if it's null then it's for all for all of the trips if it's not null then we should have a dropdown menu and a simple seach for the trips and choose the one we want to show and use for this promp 

please create a full plan on how to implment this fetch in the admin pages so that we later could be uisng it for the whole app make sure we follow the same app arch and make sure the UI look consisnet and it's UI is great could you do that 
PromoCodes


GET
/api/PromoCodes


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/PromoCodes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/PromoCodes
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCodes Data",
  "data": [
    {
      "id": 1,
      "code": 563512,
      "discountEuro": 20,
      "discountpercent": 0,
      "limited": 47,
      "tripId": 0,
      "tripName": null,
      "tripType": null,
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": null,
      "createdBy": "Karim Ayman"
    },
    {
      "id": 2,
      "code": 734423,
      "discountEuro": 20,
      "discountpercent": 0,
      "limited": 50,
      "tripId": 0,
      "tripName": null,
      "tripType": null,
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": null,
      "createdBy": "Karim Ayman"
    },
    {
      "id": 3,
      "code": 22325,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 100,
      "tripId": 2,
      "tripName": "Camel Safari",
      "tripType": "Safari",
      "priceForChild": 14,
      "priceForAdult": 28,
      "createdAt": "2026-05-13T15:16:20.0569303",
      "createdBy": "Karim Ayman"
    },
    {
      "id": 4,
      "code": 65837,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 20,
      "tripId": 1,
      "tripName": "Orange Bay Island",
      "tripType": "SEA",
      "priceForChild": 25,
      "priceForAdult": 50,
      "createdAt": "2026-05-13T15:12:12.3700742",
      "createdBy": "Karim Ayman"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:19:25 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "tripId": 0,
      "tripName": "string",
      "tripType": "string",
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": "2026-08-04T11:23:17.529Z",
      "createdBy": "string"
    }
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
401	
Unauthorized

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

POST
/api/PromoCodes


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "discountEuro": null,
  "discountpercent": 20,
  "limited": 20,
  "tripId": null
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/PromoCodes' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: application/json' \
  -d '{
  "discountEuro": null,
  "discountpercent": 20,
  "limited": 20,
  "tripId": null
}'
Request URL
https://travelapi.runasp.net/api/PromoCodes
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCode Created Successfuly",
  "data": {
    "id": 6,
    "code": 925230
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:21:32 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "code": 0
  }
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
401	
Unauthorized

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/PromoCodes/nonrelatedtrip


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/PromoCodes/nonrelatedtrip' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/PromoCodes/nonrelatedtrip
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCodes Data",
  "data": [
    {
      "id": 1,
      "code": 563512,
      "discountEuro": 20,
      "discountpercent": 0,
      "limited": 47,
      "isActived": true
    },
    {
      "id": 2,
      "code": 734423,
      "discountEuro": 20,
      "discountpercent": 0,
      "limited": 50,
      "isActived": true
    },
    {
      "id": 6,
      "code": 925230,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 20,
      "isActived": true
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:21:41 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "isActived": true
    }
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
401	
Unauthorized

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/PromoCodes/relatedtrip


Parameters
Cancel
Name	Description
PageNumber
integer($int32)
(query)
PageNumber
PageSize
integer($int32)
(query)
PageSize
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/PromoCodes/relatedtrip' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/PromoCodes/relatedtrip
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCodes Data",
  "data": [
    {
      "id": 3,
      "code": 22325,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 100,
      "tripId": 2,
      "tripName": "Camel Safari",
      "tripType": "Safari",
      "priceForChild": 14,
      "priceForAdult": 28,
      "createdAt": "2026-05-13T15:16:20.0569303",
      "createdBy": "Karim Ayman"
    },
    {
      "id": 4,
      "code": 65837,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 20,
      "tripId": 1,
      "tripName": "Orange Bay Island",
      "tripType": "SEA",
      "priceForChild": 25,
      "priceForAdult": 50,
      "createdAt": "2026-05-13T15:12:12.3700742",
      "createdBy": "Karim Ayman"
    },
    {
      "id": 5,
      "code": 517772,
      "discountEuro": 0,
      "discountpercent": 20,
      "limited": 20,
      "tripId": 14,
      "tripName": "Hurghada Orange Bay Island Snorkeling Cruise",
      "tripType": "SEA",
      "priceForChild": 22.5,
      "priceForAdult": 45,
      "createdAt": "2026-08-04T10:17:03.5838587",
      "createdBy": "pola samy"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:21:45 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": [
    {
      "id": 0,
      "code": 0,
      "discountEuro": 0,
      "discountpercent": 0,
      "limited": 0,
      "tripId": 0,
      "tripName": "string",
      "tripType": "string",
      "priceForChild": 0,
      "priceForAdult": 0,
      "createdAt": "2026-08-04T11:23:17.553Z",
      "createdBy": "string"
    }
  ]
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
401	
Unauthorized

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/PromoCodes/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
4
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/PromoCodes/4' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/PromoCodes/4
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCode Data For Id 4",
  "data": {
    "id": 4,
    "code": 65837,
    "discountEuro": 0,
    "discountpercent": 20,
    "limited": 20,
    "tripId": 1,
    "tripName": "Orange Bay Island",
    "tripType": "SEA",
    "priceForChild": 25,
    "priceForAdult": 50,
    "createdAt": "2026-05-13T15:12:12.3700742",
    "createdBy": "Karim Ayman"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:23:04 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "code": 0,
    "discountEuro": 0,
    "discountpercent": 0,
    "limited": 0,
    "tripId": 0,
    "tripName": "string",
    "tripType": "string",
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": "2026-08-04T11:23:17.563Z",
    "createdBy": "string"
  }
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
401	
Unauthorized

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links

GET
/api/PromoCodes/code/{Code}


Parameters
Cancel
Name	Description
Code *
number($double)
(path)
65837
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/PromoCodes/code/65837' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/PromoCodes/code/65837
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "PromoCode Data For Id 4",
  "data": {
    "id": 4,
    "code": 65837,
    "discountEuro": 0,
    "discountpercent": 20,
    "limited": 20,
    "tripId": 1,
    "tripName": "Orange Bay Island",
    "tripType": "SEA",
    "priceForChild": 25,
    "priceForAdult": 50,
    "createdAt": "2026-05-13T15:12:12.3700742",
    "createdBy": "Karim Ayman"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:23:18 GMT 
 server: Microsoft-IIS/10.0 
 x-powered-by: ASP.NET 
Responses
Code	Description	Links
200	
OK

Media type

text/plain
Controls Accept header.
Example Value
Schema
{
  "success": true,
  "message": "string",
  "data": {
    "id": 0,
    "code": 0,
    "discountEuro": 0,
    "discountpercent": 0,
    "limited": 0,
    "tripId": 0,
    "tripName": "string",
    "tripType": "string",
    "priceForChild": 0,
    "priceForAdult": 0,
    "createdAt": "2026-08-04T11:23:17.571Z",
    "createdBy": "string"
  }
}
No links
400	
Bad Request

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
401	
Unauthorized

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
No links
404	
Not Found

Media type

text/plain
Example Value
Schema
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}