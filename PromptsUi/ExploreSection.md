now we need to creat the section for the destinations on the homepage 
the current implmentoin of this should be the following we should call the endpoint
Destinations


GET
/api/Destinations


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
3
searchTerm
string
(query)
searchTerm
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Destinations?PageSize=3' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en'
Request URL
https://travelapi.runasp.net/api/Destinations?PageSize=3
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Destinations Data",
  "data": [
    {
      "id": 3,
      "name": " Luxor",
      "imageUrl": "images/destinations/92813d20-76e2-48b7-b618-052a6e9a7bb7.webp",
      "isFeatured": true,
      "tripsCount": 0
    },
    {
      "id": 2,
      "name": "Cairo",
      "imageUrl": "images/destinations/a621f94e-a0c1-46e4-8f34-7e53dd95f523.webp",
      "isFeatured": true,
      "tripsCount": 0
    },
    {
      "id": 1,
      "name": "Hurghada",
      "imageUrl": "images/destinations/794cac10-6e3f-47a9-8c4f-f71dad71ced4.webp",
      "isFeatured": true,
      "tripsCount": 0
    }
  ]
}
and we will only show 3 destinations 
we will make it follow the current design in the 
C:\Users\VIP\Desktop\work\tourism-website-sec\photos\PopulardestinationsMobile.png
C:\Users\VIP\Desktop\work\tourism-website-sec\photos\PopulardestinationsDesktop.png

make sure the mobile version is scrollable horizontally for the destinations
create a plan for it could you do that ?