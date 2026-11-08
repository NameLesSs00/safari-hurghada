first of all in the filters we have the following 

 BookingStatus[
        Pending = 0,
        Confirmed = 1,
        Finished = 2,
        Cancelled = 3
 ]  
okay for the plan for the booking we should just show them adn have the right filters in that page and we should be showing the status from them and all of the acionts for the please create a full plan so that we implment make sure the plan follow the current flow of the app it we have everything right is set 

Bookings


GET
/api/Bookings


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
Nationality
string
(query)
Nationality
SearchItem
string
(query)
SearchItem
Phone
string
(query)
Phone
Date
string($date-time)
(query)
Date
Status
integer($int32)
(query)

1
TripId
integer($int32)
(query)
TripId
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Bookings?Status=1' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjYxMjQyNH0.kOt4AeCLHUb34SlUFLzMyU4VrmI_2CUev4gdT9uR2Rs'
Request URL
https://travelapi.runasp.net/api/Bookings?Status=1
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Bookings Data",
  "data": []
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,06 Aug 2026 09:41:28 GMT 
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
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "nationality": "string",
      "bookingDate": "2026-08-06T09:41:29.109Z",
      "totalPrice": 0,
      "status": "string",
      "createdAt": "2026-08-06T09:41:29.109Z",
      "tripsBookings": [
        {
          "id": 0,
          "tripId": 0,
          "title": "string",
          "priceForChild": 0,
          "priceForAdult": 0,
          "noAdult": 0,
          "noChild": 0,
          "leaveDate": "2026-08-06",
          "subTotal": 0
        }
      ]
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
/api/Bookings


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "firstName": "string",
  "lastName": "string",
  "email": "a@.com",
  "phone": "021512154",
  "code": null,
  "nationality": "EGP",
  "tripsBookings": [
    {
      "tripId": 15,
      "noAdult": 1,
      "noChild": 0,
      "leaveDate": "2026-08-06"
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Bookings' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjYxMjQyNH0.kOt4AeCLHUb34SlUFLzMyU4VrmI_2CUev4gdT9uR2Rs' \
  -H 'Content-Type: application/json' \
  -d '{
  "firstName": "string",
  "lastName": "string",
  "email": "a@.com",
  "phone": "021512154",
  "code": null,
  "nationality": "EGP",
  "tripsBookings": [
    {
      "tripId": 15,
      "noAdult": 1,
      "noChild": 0,
      "leaveDate": "2026-08-06"
    }
  ]
}'
Request URL
https://travelapi.runasp.net/api/Bookings
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking Created Successfuly and Id 9",
  "data": {
    "id": 9,
    "firstName": "string",
    "lastName": "string",
    "email": "a@.com",
    "phone": "021512154",
    "nationality": "EGP",
    "bookingDate": "2026-08-06T11:33:10.1881427+02:00",
    "totalPrice": 20,
    "status": "Pending",
    "createdAt": "2026-08-06T11:33:10.25",
    "tripsBookings": [
      {
        "id": 14,
        "tripId": 15,
        "title": "english",
        "priceForChild": 20,
        "priceForAdult": 20,
        "noAdult": 1,
        "noChild": 0,
        "leaveDate": "2026-08-06",
        "subTotal": 20
      }
    ]
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Thu,06 Aug 2026 09:33:09 GMT 
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
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-08-06T09:41:29.117Z",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-08-06T09:41:29.117Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "leaveDate": "2026-08-06",
        "subTotal": 0
      }
    ]
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
/api/Bookings/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
9
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Bookings/9' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjYxMjQyNH0.kOt4AeCLHUb34SlUFLzMyU4VrmI_2CUev4gdT9uR2Rs'
Request URL
https://travelapi.runasp.net/api/Bookings/9
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Booking Data For Id 9",
  "data": {
    "id": 9,
    "firstName": "string",
    "lastName": "string",
    "email": "a@.com",
    "phone": "021512154",
    "nationality": "EGP",
    "bookingDate": "2026-08-06T11:33:10.1881427",
    "totalPrice": 20,
    "status": "Pending",
    "createdAt": "2026-08-06T11:33:10.25",
    "tripsBookings": [
      {
        "id": 14,
        "tripId": 15,
        "title": "english",
        "priceForChild": 20,
        "priceForAdult": 20,
        "noAdult": 1,
        "noChild": 0,
        "leaveDate": "2026-08-06",
        "subTotal": 20
      }
    ]
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Thu,06 Aug 2026 09:36:07 GMT 
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
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-08-06T09:41:29.126Z",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-08-06T09:41:29.126Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "leaveDate": "2026-08-06",
        "subTotal": 0
      }
    ]
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
/api/Bookings/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
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

PUT
/api/Bookings/confirm


Parameters
Try it out
Name	Description
id
integer($int32)
(query)
id
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
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-08-06T09:41:29.134Z",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-08-06T09:41:29.134Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "leaveDate": "2026-08-06",
        "subTotal": 0
      }
    ]
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

PUT
/api/Bookings/finish


Parameters
Try it out
Name	Description
id
integer($int32)
(query)
id
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
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "nationality": "string",
    "bookingDate": "2026-08-06T09:41:29.138Z",
    "totalPrice": 0,
    "status": "string",
    "createdAt": "2026-08-06T09:41:29.138Z",
    "tripsBookings": [
      {
        "id": 0,
        "tripId": 0,
        "title": "string",
        "priceForChild": 0,
        "priceForAdult": 0,
        "noAdult": 0,
        "noChild": 0,
        "leaveDate": "2026-08-06",
        "subTotal": 0
      }
    ]
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