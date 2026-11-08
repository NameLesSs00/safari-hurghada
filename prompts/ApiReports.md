for this set of endpoints they gonna be used in the admindashboard page not in a new page called reports could you link them to the current dashbaord and make them look better and later when we book we show the data for the "topTrips" craete a plan for it 
Reports


GET
/api/Reports/daily


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Reports/daily' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reports/daily
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Daily Report",
  "data": {
    "totalBookings": 0,
    "totalRevenue": 0,
    "newCustomers": 0,
    "topTrips": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:06:18 GMT 
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
    "totalBookings": 0,
    "totalRevenue": 0,
    "newCustomers": 0,
    "topTrips": [
      {
        "tripTitle": "string",
        "bookingCount": 0
      }
    ]
  }
}
No links

GET
/api/Reports/monthly


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Reports/monthly' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reports/monthly
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Monthly Report",
  "data": {
    "totalBookings": 0,
    "totalRevenue": 0,
    "newCustomers": 0,
    "topTrips": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:06:24 GMT 
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
    "totalBookings": 0,
    "totalRevenue": 0,
    "newCustomers": 0,
    "topTrips": [
      {
        "tripTitle": "string",
        "bookingCount": 0
      }
    ]
  }
}
No links

GET
/api/Reports/yearly


Parameters
Cancel
No parameters

Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Reports/yearly' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Reports/yearly
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Yearly Report",
  "data": {
    "totalBookings": 8,
    "totalRevenue": 0,
    "newCustomers": 0,
    "topTrips": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:06:28 GMT 
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
ReportEntityResponseAPI{
success	[...]
message	[...]
data	ReportEntity{
totalBookings	integer($int32)
totalRevenue	number($double)
newCustomers	integer($int32)
topTrips	[
nullable: true
TripReportEntity{
tripTitle	string
nullable: true
bookingCount	integer($int32)
}]
}
}