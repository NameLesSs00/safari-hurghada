now for the next section we should create a plan for the Blogs please follow the arch and the design and create the page for it and make sure it works right 
Blogs


GET
/api/Blogs


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
  'https://travelapi.runasp.net/api/Blogs' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Blogs
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Blogs retrieved successfully",
  "data": [
    {
      "id": 6,
      "title": "The Ultimate Guide to Hurghada: How to Experience the Best of the Red Sea",
      "content": "Sun-drenched beaches, vibrant coral reefs, and the rugged beauty of the Eastern Desert—Hurghada is Egypt’s premier coastal escape. Whether you are an adrenaline junkie or someone who just wants to lounge by the turquoise water, this guide breaks down exactly how to conquer the Red Sea.",
      "imageUrl": "images/blogs/ec4ca085-6ea7-4bdc-93a2-94345322611e.webp",
      "blogSections": [
        {
          "id": 13,
          "sectionNumber": 1,
          "title": "1. Unmissable Adventures: From the Reefs to the Dunes",
          "content": "To truly experience Hurghada, you have to split your time between the crystal-clear water and the dramatic desert landscape.\n\nThe Underwater World: The Red Sea is world-renowned for its biodiversity. Take a boat trip to the Giftun Islands (Orange Bay) for Caribbean-style white sands, or book a scuba dive at Carless Reef to swim alongside vibrant corals, sea turtles, and exotic fish.\n\nThe Eastern Desert: Swap your flippers for wheels and book a late-afternoon Quad Bike Safari. You'll race across the dunes, watch a breathtaking desert sunset, and visit a traditional Bedouin camp for tea and stargazing under a clear night sky.",
          "imageUrl": "images/blogs/sections/db03621b-95cf-4e6b-9a76-49dfb4bc0b72.webp",
          "blogId": 6
        },
        {
          "id": 14,
          "sectionNumber": 2,
          "title": "2. Choosing Your Vibe: The Best Neighborhoods",
          "content": "Hurghada stretches along miles of coastline, and where you set up camp dictates the flavor of your trip.\n\nSahl Hasheesh for Luxury: Ideal for couples and luxury travelers, this upscale area is quiet, exclusive, and features gorgeous, manicured beach boardwalks.\n\nMakadi Bay for Families and Divers: This spot is packed with massive all-inclusive resorts and boasts incredible, easily accessible house reefs right off the beach.\n\nEl Gouna for Trendy Crowds: Located just 30 minutes north, this chic, eco-friendly lagoon town is the hub for kitesurfers, boutique dining, and vibrant nightlife.",
          "imageUrl": "images/blogs/sections/7e591800-84c1-4a4d-98d8-eac82b6997ce.webp",
          "blogId": 6
        },
        {
          "id": 15,
          "sectionNumber": 3,
          "title": "3. Local Secrets: Dining and Navigating Like a Pro",
          "content": "Maximizing your enjoyment means stepping outside the resort bubble and handling the local environment like a seasoned traveler.\n\nEat Local: While resorts offer great international buffets, head to El Dahar (Old Town) for authentic Egyptian food. Try Koshari (a comforting mix of rice, lentils, macaroni, and spicy tomato sauce) or feast on fresh, spiced sea bass at the local fish markets.\n\nGetting Around Smoothly: Skip the stress of haggling with local taxi drivers and simply use Uber or InDrive, which operate widely and safely throughout the city.\n\nRespect the Reef: The Red Sea ecosystem is fragile. Always wear reef-safe sunscreen, never touch the coral, and keep small cash bills on hand for tipping your boat crews—they work incredibly hard to keep you safe.",
          "imageUrl": "images/blogs/sections/1579f693-b529-4078-a753-a35d9773e472.webp",
          "blogId": 6
        }
      ]
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:35:19 GMT 
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
      "title": "string",
      "content": "string",
      "imageUrl": "string",
      "blogSections": [
        {
          "id": 0,
          "sectionNumber": 0,
          "title": "string",
          "content": "string",
          "imageUrl": "string",
          "blogId": 0
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
/api/Blogs


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "title": "title",
  "content": "main decs",
  "blogSections": [
    {
      "sectionNumber": 1,
      "title": "123",
      "content": "123123"
    },
{
      "sectionNumber": 2,
      "title": "string2",
      "content": "string3"
    },
{
      "sectionNumber": 3,
      "title": "string1",
      "content": "string44"
    },
{
      "sectionNumber": 4,
      "title": "string141",
      "content": "string11"
    }
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Blogs' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: application/json' \
  -d '{
  "title": "title",
  "content": "main decs",
  "blogSections": [
    {
      "sectionNumber": 1,
      "title": "123",
      "content": "123123"
    },
{
      "sectionNumber": 2,
      "title": "string2",
      "content": "string3"
    },
{
      "sectionNumber": 3,
      "title": "string1",
      "content": "string44"
    },
{
      "sectionNumber": 4,
      "title": "string141",
      "content": "string11"
    }
  ]
}'
Request URL
https://travelapi.runasp.net/api/Blogs
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": 7,
    "title": "title",
    "content": "main decs",
    "imageUrl": null,
    "blogSections": [
      {
        "id": 16,
        "sectionNumber": 1,
        "title": "123",
        "content": "123123",
        "imageUrl": null,
        "blogId": 7
      },
      {
        "id": 17,
        "sectionNumber": 2,
        "title": "string2",
        "content": "string3",
        "imageUrl": null,
        "blogId": 7
      },
      {
        "id": 18,
        "sectionNumber": 3,
        "title": "string1",
        "content": "string44",
        "imageUrl": null,
        "blogId": 7
      },
      {
        "id": 19,
        "sectionNumber": 4,
        "title": "string141",
        "content": "string11",
        "imageUrl": null,
        "blogId": 7
      }
    ]
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:36:27 GMT 
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
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "blogSections": [
      {
        "id": 0,
        "sectionNumber": 0,
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "blogId": 0
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
/api/Blogs/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
7
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Blogs/7' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Blogs/7
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Blog retrieved successfully",
  "data": {
    "id": 7,
    "title": "title",
    "content": "main decs",
    "imageUrl": null,
    "blogSections": [
      {
        "id": 16,
        "sectionNumber": 1,
        "title": "123",
        "content": "123123",
        "imageUrl": null,
        "blogId": 7
      },
      {
        "id": 17,
        "sectionNumber": 2,
        "title": "string2",
        "content": "string3",
        "imageUrl": null,
        "blogId": 7
      },
      {
        "id": 18,
        "sectionNumber": 3,
        "title": "string1",
        "content": "string44",
        "imageUrl": null,
        "blogId": 7
      },
      {
        "id": 19,
        "sectionNumber": 4,
        "title": "string141",
        "content": "string11",
        "imageUrl": null,
        "blogId": 7
      }
    ]
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:36:50 GMT 
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
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "blogSections": [
      {
        "id": 0,
        "sectionNumber": 0,
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "blogId": 0
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
/api/Blogs/{id}


Parameters
Try it out
Name	Description
id *
integer($int32)
(path)
id
Request body

application/json
Example Value
Schema
{
  "id": 0,
  "title": "string",
  "content": "string",
  "blogSections": [
    {
      "id": 0,
      "title": "string",
      "sectionNumber": 0,
      "content": "string"
    }
  ]
}
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
    "title": "string",
    "content": "string",
    "imageUrl": "string",
    "blogSections": [
      {
        "id": 0,
        "sectionNumber": 0,
        "title": "string",
        "content": "string",
        "imageUrl": "string",
        "blogId": 0
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
/api/Blogs/{id}



POST
/api/Blogs/image


Parameters
Cancel
Reset
Name	Description
blogid
integer($int32)
(query)
7
Request body

multipart/form-data
file
string($binary)
Costar.jpg
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Blogs/image?blogid=7' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Costar.jpg;type=image/jpeg'
Request URL
https://travelapi.runasp.net/api/Blogs/image?blogid=7
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Blog image uploaded successfully",
  "data": "images/blogs/b1579f31-e298-4b92-bb5a-a6c6c492c671.webp"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:37:11 GMT 
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

POST
/api/Blogs/section/image


Parameters
Cancel
Reset
Name	Description
blogid
integer($int32)
(query)
7
sectionid
integer($int32)
(query)
16
Request body

multipart/form-data
file
string($binary)
Group 18.png
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Blogs/section/image?blogid=7&sectionid=16' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@Group 18.png;type=image/png'
Request URL
https://travelapi.runasp.net/api/Blogs/section/image?blogid=7&sectionid=16
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Section image uploaded successfully",
  "data": "images/blogs/sections/b6b74221-eaf4-426e-849c-dddad9831048.webp"
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:37:55 GMT 
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

DELETE
/api/Blogs/{id}/image


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
7
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://travelapi.runasp.net/api/Blogs/7/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Blogs/7/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Blog image deleted successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:38:05 GMT 
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

DELETE
/api/Blogs/section/{sectionid}/image


Parameters
Cancel
Name	Description
sectionid *
integer($int32)
(path)
16
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://travelapi.runasp.net/api/Blogs/section/16/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Blogs/section/16/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Section image deleted successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 09:38:12 GMT 
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