 "data": {
    "id": 2,
    "markerID": "937713",
    "destinationInfo": {
      "id": 2,
      "name": "Hurghada",
      "imageUrl": "images/destinations/71a9e90e-d2a5-486b-9520-9013c7bba806.webp",
      "isFeatured": true
    },
    "destination": null,
    "name": "Premium Private Transfer in Hurghada",
    "description": "Enjoy a seamless and comfortable journey with our premium private transfer service in Hurghada. Whether you need an airport transfer, a ride to your hotel, or transportation to anywhere within Hurghada, our professional drivers guarantee the best and most reliable service. Contact us to customize your route and experience stress-free travel in a modern, air-conditioned vehicle.",
    "timeFrom": "00:00:00",
    "durationValue": 1,
    "durationTypeName": "Hours",
    "adultPrice": 59,
    "childPrice": 0,
    "currencyName": "EUR",
    "isActive": true,
    "tripTypeName": "Transfer",
    "createdBy": "Karim Ayman",
    "createdAt": "2026-08-18T12:51:56.6058469",
    "highlights": [
      "Flexible pick-up and drop-off anywhere in Hurghada",
      "Modern, comfortable, and air-conditioned vehicles",
      "Professional and punctual drivers"
    ],
    "includes": [
      "Private air-conditioned vehicle",
      "Professional driver"
    ],
    "excludes": [
      "Gratuities (optional)"
    ],
    "whatToBring": [
      "Booking confirmation",
      "Valid ID"
    ],
    "availableDays": [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "images": [
      {
        "id": 4,
        "imageUrl": "images/Trips/4e554a8f-c127-452d-8b53-85795f46f939.webp",
        "isPrimary": true
      },
      {
        "id": 5,
        "imageUrl": "images/Trips/fa88851e-bcf2-434b-b473-7e7220b95c2b.webp",
        "isPrimary": false
      }
    ]
  }
  this is one of the trips we have the goal for this task is we need to translate this trip to all of the languages we have in the website and 
  here is a token for this task so you can talk with the api 

and here is the endpoint you have to use 
PUT
/api/Trips


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "id": 0,
  "destinationId": 0,
  "name": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  },
  "description": {
    "en": "string",
    "fr": "string",
    "ru": "string",
    "ro": "string"
  },
  "timeFrom": "string",
  "durationValue": 0,
  "durationType": 0,
  "adultPrice": 0,
  "childPrice": 0,
  "tripTypeId": 0,
  "highlights": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "includes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "excludes": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "whatToBring": [
    {
      "en": "string",
      "fr": "string",
      "ru": "string",
      "ro": "string"
    }
  ],
  "availabilityDayNo": [
    0
  ]
}
here is the explaintoin of the data here 
this put looks like the post request in many things
anyways 
availabilityDayNo will alowys be a list of number from 0 to 6 those are the days of the week staring from sunday
tripTypeId is the trip type id here are all of them we won't change it for this trip
{
  "success": true,
  "message": "Trip Types Data",
  "data": [
    {
      "id": 6,
      "name": "Culture excursions",
      "imageUrl": "images/triptypes/b0a73a30-8bd4-45ca-916d-8d5aa8cd6ac3.webp"
    },
    {
      "id": 10,
      "name": "diving ",
      "imageUrl": "images/triptypes/bcdcda68-3f8b-4e66-b76a-e9348c79c518.webp"
    },
    {
      "id": 9,
      "name": "Horse riding ",
      "imageUrl": "images/triptypes/57c7ef8a-8b83-4ee5-98ab-d4e4798cedd1.webp"
    },
    {
      "id": 5,
      "name": "Safari excursions",
      "imageUrl": "images/triptypes/df609b11-929a-4354-b90e-1d5aaad2a5c2.webp"
    },
    {
      "id": 4,
      "name": "Snorkelling",
      "imageUrl": "images/triptypes/191979e8-b4d4-486c-baa5-124b4f6e2c1c.webp"
    },
    {
      "id": 7,
      "name": "Spa & massage ",
      "imageUrl": "images/triptypes/38d6b1b4-acda-4a02-ac19-d682a934161f.webp"
    },
    {
      "id": 8,
      "name": "Transfer",
      "imageUrl": "images/triptypes/723ed212-f509-401c-9873-270fcbd8ec36.webp"
    }
  ]
}
and the next thing is the durationType 0 means hours and 1 means days durationValue this si the value of it and timeFrom is the type stapms like 12:00:00 AM 
also the destinationId won't be change but here is the list 
 {
      "id": 4,
      "name": "Aswan",
      "imageUrl": "images/destinations/c74ac07e-7c06-455d-95bf-513738b41ee5.webp",
      "isFeatured": true,
      "tripsCount": 0
    },
    {
      "id": 5,
      "name": "Cairo",
      "imageUrl": "images/destinations/f038fe06-62a9-44ec-a73c-f890adce752b.webp",
      "isFeatured": true,
      "tripsCount": 0
    },
    {
      "id": 3,
      "name": "Giza",
      "imageUrl": "images/destinations/760463d9-4275-49e5-af44-fd37f0a94f70.webp",
      "isFeatured": false,
      "tripsCount": 0
    },
    {
      "id": 2,
      "name": "Hurghada",
      "imageUrl": "images/destinations/71a9e90e-d2a5-486b-9520-9013c7bba806.webp",
      "isFeatured": true,
      "tripsCount": 0
    },
    {
      "id": 6,
      "name": "Luxor",
      "imageUrl": "images/destinations/a7fa59fd-78a4-4568-b804-39b8039cc9cb.webp",
      "isFeatured": false,
      "tripsCount": 0
    }
now you have everything in your context please translte the trip to the other 3 langues as make sure you map it right en , fr , de , pl just like we did before okay 
please create a plan for this task and here is the token 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NzczNDc5NH0.4x3Pp4sqgJ1nqTv298FVYon3Hv2P7oGa8B4PsxF_97E
make sure you add the prefix Bearer {token}