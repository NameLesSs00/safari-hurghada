now for the next part is the reviews as for the admin he will only review them and delete them if one of them needed to be deleted so could you please implment them and when we create the single page for a trip later we will link the post so please implmetn all of the needed endpoitns so that the app works nice and well 
Reviews


GET
/api/Reviews


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
TripId
integer($int32)
(query)
TripId
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Reviews' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reviews
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Reviews Data",
  "data": [
    {
      "id": 18,
      "comment": "a very nice comment ",
      "firstName": "test",
      "lastName": "testing",
      "email": "email@w.com",
      "phone": "012512141211",
      "rate": 5,
      "createdAt": "2026-08-04T11:06:10.0688027",
      "tripName": "Hurghada Orange Bay Island Snorkeling Cruise",
      "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
      "markerID": "828045",
      "destination": "hurghada",
      "tripTypeName": "SEA",
      "adultPrice": 45,
      "childPrice": 22.5,
      "currencyName": "EUR"
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:06:29 GMT 
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
DtoReviewReadIEnumerableResponseAPI{
success	boolean
message	string
nullable: true
data	[
nullable: true
DtoReviewRead{
id	integer($int32)
comment	string
nullable: true
firstName	string
nullable: true
lastName	string
nullable: true
email	string
nullable: true
phone	string
nullable: true
rate	integer($int32)
nullable: true
createdAt	string($date-time)
nullable: true
tripName	string
nullable: true
description	string
nullable: true
markerID	string
nullable: true
destination	string
nullable: true
tripTypeName	string
nullable: true
adultPrice	number($double)
childPrice	number($double)
currencyName	string
nullable: true
}]
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
/api/Reviews


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "test",
  "lastName": "testing",
  "email": "email@w.com",
  "phone": "012512141211",
  "tripId": 14,
  "comment": "a very nice comment ",
  "rate": 5
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Reviews' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "test",
  "lastName": "testing",
  "email": "email@w.com",
  "phone": "012512141211",
  "tripId": 14,
  "comment": "a very nice comment ",
  "rate": 5
}'
Request URL
https://travelapi.runasp.net/api/Reviews
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review Created Successfully",
  "data": {
    "id": 18,
    "comment": "a very nice comment ",
    "firstName": "test",
    "lastName": "testing",
    "email": "email@w.com",
    "phone": "012512141211",
    "rate": 5,
    "createdAt": "2026-08-04T11:06:10.0688027Z",
    "tripName": "Hurghada Orange Bay Island Snorkeling Cruise",
    "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "markerID": "828045",
    "destination": "hurghada",
    "tripTypeName": "SEA",
    "adultPrice": 45,
    "childPrice": 22.5,
    "currencyName": "EUR"
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:06:09 GMT 
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
    "comment": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "rate": 0,
    "createdAt": "2026-08-04T11:07:12.679Z",
    "tripName": "string",
    "description": "string",
    "markerID": "string",
    "destination": "string",
    "tripTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string"
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
/api/Reviews/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
18
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Reviews/18' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reviews/18
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review Data For Id 18",
  "data": {
    "id": 18,
    "comment": "a very nice comment ",
    "firstName": "test",
    "lastName": "testing",
    "email": "email@w.com",
    "phone": "012512141211",
    "rate": 5,
    "createdAt": "2026-08-04T11:06:10.0688027",
    "tripName": "Hurghada Orange Bay Island Snorkeling Cruise",
    "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "markerID": "828045",
    "destination": "hurghada",
    "tripTypeName": "SEA",
    "adultPrice": 45,
    "childPrice": 22.5,
    "currencyName": "EUR"
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:06:43 GMT 
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
    "comment": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "rate": 0,
    "createdAt": "2026-08-04T11:07:12.697Z",
    "tripName": "string",
    "description": "string",
    "markerID": "string",
    "destination": "string",
    "tripTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string"
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

DELETE
/api/Reviews/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
18
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://travelapi.runasp.net/api/Reviews/18' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reviews/18
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Review Removed Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:07:13 GMT 
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
  "data": "string"
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
/api/Reviews/trip/{tripId}/average


Parameters
Cancel
Name	Description
tripId *
integer($int32)
(path)
14
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Reviews/trip/14/average' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reviews/trip/14/average
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Average Review For Trip 14",
  "data": {
    "averageRate": 5,
    "totalReviews": 1
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 11:06:56 GMT 
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
    "averageRate": 0,
    "totalReviews": 0
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