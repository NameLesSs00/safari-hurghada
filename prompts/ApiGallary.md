for the next section is gonna be the gallry it should be viewed as a gallry in the admin dashboard it should not be a table we could view them as cards could you create a plan for them to work right and great ?
Gallery


GET
/api/Gallery/GetAllImages


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Gallery/GetAllImages' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Gallery/GetAllImages
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Images retrieved successfully",
  "data": [
    {
      "id": 6,
      "imageUrl": "images/Gallery/e6fbdd91-ed98-433f-b61d-452056ef9876.webp",
      "isFeatured": true
    },
    {
      "id": 8,
      "imageUrl": "images/Gallery/c8017469-81dc-4a51-b56d-0a1a7f27b0fb.webp",
      "isFeatured": true
    },
    {
      "id": 10,
      "imageUrl": "images/Gallery/758c5631-eeef-4037-9e30-fa5e40e744be.webp",
      "isFeatured": true
    },
    {
      "id": 11,
      "imageUrl": "images/Gallery/1719ebab-0756-4e64-8676-5acb5d68a4b2.webp",
      "isFeatured": true
    },
    {
      "id": 12,
      "imageUrl": "images/Gallery/9de65ce0-3b68-4d2c-a4f8-e53189b13289.webp",
      "isFeatured": true
    },
    {
      "id": 14,
      "imageUrl": "images/Gallery/41801b77-b335-428d-9172-4d356dae75ea.webp",
      "isFeatured": true
    },
    {
      "id": 16,
      "imageUrl": "images/Gallery/95b04623-d165-4e81-84b9-eefcb63f016d.webp",
      "isFeatured": false
    },
    {
      "id": 17,
      "imageUrl": "images/Gallery/b3b0c0c7-84b3-476b-b5f0-ef05bdfa937a.webp",
      "isFeatured": false
    },
    {
      "id": 18,
      "imageUrl": "images/Gallery/299cb84e-3b64-4d3b-a518-bd74bc9e2a79.webp",
      "isFeatured": false
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:55:08 GMT 
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
      "imageUrl": "string",
      "isFeatured": true
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
/api/Gallery/GetImageById/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
6
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Gallery/GetImageById/6' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Gallery/GetImageById/6
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image retrieved successfully",
  "data": {
    "id": 6,
    "imageUrl": "images/Gallery/e6fbdd91-ed98-433f-b61d-452056ef9876.webp",
    "isFeatured": true
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:55:21 GMT 
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
    "imageUrl": "string",
    "isFeatured": true
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
/api/Gallery/GetByImageUrl



POST
/api/Gallery/AddImage


Parameters
Cancel
Reset
No parameters

Request body

multipart/form-data
ImageFile *
string($binary)
Group 18.png
IsFeatured
boolean

false
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Gallery/AddImage' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: multipart/form-data' \
  -F 'ImageFile=@Group 18.png;type=image/png' \
  -F 'IsFeatured=false'
Request URL
https://travelapi.runasp.net/api/Gallery/AddImage
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image added successfully",
  "data": {
    "id": 21,
    "imageUrl": "images/Gallery/5dd275ce-6a02-4114-b9b7-9b14dd01c0a5.webp",
    "isFeatured": false
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:56:02 GMT 
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
    "imageUrl": "string",
    "isFeatured": true
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
/api/Gallery/DeleteImage/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
21
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://travelapi.runasp.net/api/Gallery/DeleteImage/21' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Gallery/DeleteImage/21
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image deleted successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:56:12 GMT 
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