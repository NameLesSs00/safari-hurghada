now for the most imporant endpoints for the whole app are the trips make sure they work right and are implment in the best way possible here are info you need to know in the availabilityDayNo are from 0 to 6 0 means sunday and so on if we select all this means this trip is avaalbe daily and as you can see there are so much data and to make is easy for the user to enter the data we should make it in many steps the first step is for example for some things and second and third and fourth and so on and we can't add images unless we create the trip so we should put the images in the last step and make it look as great as possible and we should be fetching them 4 times when edting so that we view all of the langauges right please create a full plan to make it look nice and make it easy for our user to enter the trips could you create a plan so that it works right ?
Trips


GET
/api/Trips


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
MinPrice
number($double)
(query)
MinPrice
MaxPrice
number($double)
(query)
MaxPrice
TypeId
integer($int32)
(query)
TypeId
DestinationId
integer($int32)
(query)
DestinationId
Destination
string
(query)
Destination
SearchItem
string
(query)
SearchItem
includeInactive
boolean
(query)

false
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Trips?includeInactive=false' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips?includeInactive=false
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trips Data",
  "data": [
    {
      "id": 13,
      "markerID": "709337",
      "destinationInfo": {
        "id": 1,
        "name": "english",
        "imageUrl": "images/destinations/6568e9ba-5975-4869-b4bf-3f3d394acca0.webp",
        "isFeatured": false
      },
      "destination": null,
      "name": "test",
      "description": "123",
      "timeFrom": "20:22:00",
      "durationValue": 1,
      "durationTypeName": "Hours",
      "adultPrice": 1,
      "childPrice": 1,
      "currencyName": "EUR",
      "isActive": true,
      "tripTypeName": "Safari",
      "createdBy": "pola samy",
      "createdAt": "2026-05-24T17:22:15.6715698",
      "highlights": [],
      "includes": [],
      "excludes": [],
      "whatToBring": [],
      "availableDays": [
        "Sunday",
        "Monday",
        "Saturday",
        "Friday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "images": [
        {
          "id": 30,
          "imageUrl": "images/Trips/6f990d96-5ce9-459c-9c20-c93e1e5b12ce.webp",
          "isPrimary": false
        },
        {
          "id": 31,
          "imageUrl": "images/Trips/1b309299-8fe5-49d2-ac5c-54c44f742490.webp",
          "isPrimary": false
        },
        {
          "id": 32,
          "imageUrl": "images/Trips/14900309-cebc-4c26-a8c4-fc6db60a8964.webp",
          "isPrimary": false
        }
      ]
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:14:36 GMT 
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
      "markerID": "string",
      "destinationInfo": {
        "id": 0,
        "name": "string",
        "imageUrl": "string",
        "isFeatured": true
      },
      "destination": "string",
      "name": "string",
      "description": "string",
      "timeFrom": "string",
      "durationValue": 0,
      "durationTypeName": "string",
      "adultPrice": 0,
      "childPrice": 0,
      "currencyName": "string",
      "isActive": true,
      "tripTypeName": "string",
      "createdBy": "string",
      "createdAt": "2026-08-04T10:20:08.996Z",
      "highlights": [
        "string"
      ],
      "includes": [
        "string"
      ],
      "excludes": [
        "string"
      ],
      "whatToBring": [
        "string"
      ],
      "availableDays": [
        "string"
      ],
      "images": [
        {
          "id": 0,
          "imageUrl": "string",
          "isPrimary": true
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
/api/Trips


Parameters
Cancel
Reset
No parameters

Request body

application/json
{
  "destinationId": 6,
  "name": {
    "en": "Hurghada Orange Bay Island Snorkeling Cruise",
    "fr": "Croisière de plongée en apnée à l'île d'Orange Bay à Hurghada",
    "ru": "Морской круиз с сноркелингом на остров Оранж Бэй в Хургаде",
    "ro": "Croazieră de snorkeling pe Insula Orange Bay din Hurghada"
  },
  "description": {
    "en": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "fr": "Profitez d'une excursion en bateau d'une journée complète vers la superbe île d'Orange Bay dans la mer Rouge. Profitez de la plongée en apnée dans des récifs coralliens vibrants, détendez-vous sur des plages de sable et savourez un délicieux déjeuner buffet à bord.",
    "ru": "Откройте для себя однодневную морскую прогулку к потрясающему острову Оранж Бэй в Красном море. Наслаждайтесь сноркелингом у живописных коралловых рифов, отдыхом на песчаных пляжах и вкусным обедом «шведский стол» на борту.",
    "ro": "Experimentați o excursie de o zi cu barca pe uimitoara insulă Orange Bay din Marea Roșie. Bucurați-vă de snorkeling la recife de corali vibrante, relaxare pe plaje cu nisip și un prânz delicios tip bufet suedez servit la bord."
  },
  "timeFrom": "08:00:00",
  "durationValue": 8,
  "durationType": 1,
  "adultPrice": 45.00,
  "childPrice": 22.50,
  "tripTypeId": 2,
  "highlights": [
    {
      "en": "Relax on the white sandy beaches of Orange Bay",
      "fr": "Détendez-vous sur les plages de sable blanc d'Orange Bay",
      "ru": "Отдых на белых песчаных пляжах Оранж Бэй",
      "ro": "Relaxați-vă pe plajele cu nisip alb din Orange Bay"
    },
    {
      "en": "Snorkel at two different spots rich in coral reefs and marine life",
      "fr": "Faites de la plongée en apnée dans deux sites différents riches en récifs coralliens",
      "ru": "Сноркелинг в двух разных местах, богатых кораллами и морской фауной",
      "ro": "Faceți snorkeling în două locuri diferite, bogate în recife de corali și viață marină"
    },
    {
      "en": "Enjoy water sports activities (banana boat and sofa ride)",
      "fr": "Profitez d'activités de sports nautiques (banane et canapé)",
      "ru": "Наслаждайтесь водными видами спорта (банан и таблетка)",
      "ro": "Bucurați-vă de activități de sporturi nautice (banana boat și canapea)"
    }
  ],
  "includes": [
    {
      "en": "Hotel pick-up and drop-off by air-conditioned van",
      "fr": "Prise en charge et retour à l'hôtel en minibus climatisé",
      "ru": "Трансфер из отеля и обратно на кондиционируемом микроавтобусе",
      "ro": "Preluare și predare la hotel cu dubă cu aer condiționat"
    },
    {
      "en": "Open-buffet lunch and soft drinks on the boat",
      "fr": "Déjeuner buffet et boissons non alcoolisées sur le bateau",
      "ru": "Обед «шведский стол» и безалкогольные напитки на лодке",
      "ro": "Prânz tip bufet deschis și băuturi răcoritoare pe barcă"
    },
    {
      "en": "Snorkeling equipment (mask, fins, and life jacket)",
      "fr": "Équipement de plongée en apnée (masque, palmes et gilet de sauvetage)",
      "ru": "Оборудование для сноркелинга (маска, ласты и спасательный жилет)",
      "ro": "Echipament de snorkeling (mască, labe de înot și vestă de salvare)"
    }
  ],
  "excludes": [
    {
      "en": "National park preservation fee",
      "fr": "Frais de préservation du parc national",
      "ru": "Экологический сбор национального парка",
      "ro": "Taxa de conservare a parcului național"
    },
    {
      "en": "Gratuities and personal expenses",
      "fr": "Pourboires et dépenses personnelles",
      "ru": "Чаевые и личные расходы",
      "ro": "Bacșiș și cheltuieli personale"
    }
  ],
  "whatToBring": [
    {
      "en": "Swimwear and a towel",
      "fr": "Maillot de bain et serviette",
      "ru": "Купальник и полотенце",
      "ro": "Costum de baie și un prosop"
    },
    {
      "en": "Sunglasses and sunscreen",
      "fr": "Lunettes de soleil et crème solaire",
      "ru": "Солнцезащитные очки и крем от загара",
      "ro": "Ochelari de soare și cremă de protecție solară"
    },
    {
      "en": "Camera or waterproof phone case",
      "fr": "Appareil photo ou étui étanche pour téléphone",
      "ru": "Фотоаппарат или водонепроницаемый чехол для телефона",
      "ro": "Cameră foto sau husă impermeabilă pentru telefon"
    }
  ],
  "availabilityDayNo": [
    1,
    2,
    3,
    4,
    5,
    6,
    0
  ]
}
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Trips' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: application/json' \
  -d '{
  "destinationId": 6,
  "name": {
    "en": "Hurghada Orange Bay Island Snorkeling Cruise",
    "fr": "Croisière de plongée en apnée à l'\''île d'\''Orange Bay à Hurghada",
    "ru": "Морской круиз с сноркелингом на остров Оранж Бэй в Хургаде",
    "ro": "Croazieră de snorkeling pe Insula Orange Bay din Hurghada"
  },
  "description": {
    "en": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "fr": "Profitez d'\''une excursion en bateau d'\''une journée complète vers la superbe île d'\''Orange Bay dans la mer Rouge. Profitez de la plongée en apnée dans des récifs coralliens vibrants, détendez-vous sur des plages de sable et savourez un délicieux déjeuner buffet à bord.",
    "ru": "Откройте для себя однодневную морскую прогулку к потрясающему острову Оранж Бэй в Красном море. Наслаждайтесь сноркелингом у живописных коралловых рифов, отдыхом на песчаных пляжах и вкусным обедом «шведский стол» на борту.",
    "ro": "Experimentați o excursie de o zi cu barca pe uimitoara insulă Orange Bay din Marea Roșie. Bucurați-vă de snorkeling la recife de corali vibrante, relaxare pe plaje cu nisip și un prânz delicios tip bufet suedez servit la bord."
  },
  "timeFrom": "08:00:00",
  "durationValue": 8,
  "durationType": 1,
  "adultPrice": 45.00,
  "childPrice": 22.50,
  "tripTypeId": 2,
  "highlights": [
    {
      "en": "Relax on the white sandy beaches of Orange Bay",
      "fr": "Détendez-vous sur les plages de sable blanc d'\''Orange Bay",
      "ru": "Отдых на белых песчаных пляжах Оранж Бэй",
      "ro": "Relaxați-vă pe plajele cu nisip alb din Orange Bay"
    },
    {
      "en": "Snorkel at two different spots rich in coral reefs and marine life",
      "fr": "Faites de la plongée en apnée dans deux sites différents riches en récifs coralliens",
      "ru": "Сноркелинг в двух разных местах, богатых кораллами и морской фауной",
      "ro": "Faceți snorkeling în două locuri diferite, bogate în recife de corali și viață marină"
    },
    {
      "en": "Enjoy water sports activities (banana boat and sofa ride)",
      "fr": "Profitez d'\''activités de sports nautiques (banane et canapé)",
      "ru": "Наслаждайтесь водными видами спорта (банан и таблетка)",
      "ro": "Bucurați-vă de activități de sporturi nautice (banana boat și canapea)"
    }
  ],
  "includes": [
    {
      "en": "Hotel pick-up and drop-off by air-conditioned van",
      "fr": "Prise en charge et retour à l'\''hôtel en minibus climatisé",
      "ru": "Трансфер из отеля и обратно на кондиционируемом микроавтобусе",
      "ro": "Preluare și predare la hotel cu dubă cu aer condiționat"
    },
    {
      "en": "Open-buffet lunch and soft drinks on the boat",
      "fr": "Déjeuner buffet et boissons non alcoolisées sur le bateau",
      "ru": "Обед «шведский стол» и безалкогольные напитки на лодке",
      "ro": "Prânz tip bufet deschis și băuturi răcoritoare pe barcă"
    },
    {
      "en": "Snorkeling equipment (mask, fins, and life jacket)",
      "fr": "Équipement de plongée en apnée (masque, palmes et gilet de sauvetage)",
      "ru": "Оборудование для сноркелинга (маска, ласты и спасательный жилет)",
      "ro": "Echipament de snorkeling (mască, labe de înot și vestă de salvare)"
    }
  ],
  "excludes": [
    {
      "en": "National park preservation fee",
      "fr": "Frais de préservation du parc national",
      "ru": "Экологический сбор национального парка",
      "ro": "Taxa de conservare a parcului național"
    },
    {
      "en": "Gratuities and personal expenses",
      "fr": "Pourboires et dépenses personnelles",
      "ru": "Чаевые и личные расходы",
      "ro": "Bacșiș și cheltuieli personale"
    }
  ],
  "whatToBring": [
    {
      "en": "Swimwear and a towel",
      "fr": "Maillot de bain et serviette",
      "ru": "Купальник и полотенце",
      "ro": "Costum de baie și un prosop"
    },
    {
      "en": "Sunglasses and sunscreen",
      "fr": "Lunettes de soleil et crème solaire",
      "ru": "Солнцезащитные очки и крем от загара",
      "ro": "Ochelari de soare și cremă de protecție solară"
    },
    {
      "en": "Camera or waterproof phone case",
      "fr": "Appareil photo ou étui étanche pour téléphone",
      "ru": "Фотоаппарат или водонепроницаемый чехол для телефона",
      "ro": "Cameră foto sau husă impermeabilă pentru telefon"
    }
  ],
  "availabilityDayNo": [
    1,
    2,
    3,
    4,
    5,
    6,
    0
  ]
}'
Request URL
https://travelapi.runasp.net/api/Trips
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Created Successfully",
  "data": {
    "id": 14,
    "markerID": "828045",
    "destinationInfo": {
      "id": 6,
      "name": "hurghada",
      "imageUrl": "images/destinations/880df4ec-eb55-45cc-b440-0949f1d359da.webp",
      "isFeatured": true
    },
    "destination": null,
    "name": "Hurghada Orange Bay Island Snorkeling Cruise",
    "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "timeFrom": "08:00:00",
    "durationValue": 8,
    "durationTypeName": "Days",
    "adultPrice": 45,
    "childPrice": 22.5,
    "currencyName": "EUR",
    "isActive": true,
    "tripTypeName": "SEA",
    "createdBy": "pola samy",
    "createdAt": "2026-08-04T10:17:03.5838587Z",
    "highlights": [
      "Relax on the white sandy beaches of Orange Bay",
      "Snorkel at two different spots rich in coral reefs and marine life",
      "Enjoy water sports activities (banana boat and sofa ride)"
    ],
    "includes": [
      "Hotel pick-up and drop-off by air-conditioned van",
      "Open-buffet lunch and soft drinks on the boat",
      "Snorkeling equipment (mask, fins, and life jacket)"
    ],
    "excludes": [
      "National park preservation fee",
      "Gratuities and personal expenses"
    ],
    "whatToBring": [
      "Swimwear and a towel",
      "Sunglasses and sunscreen",
      "Camera or waterproof phone case"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "images": []
  }
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:17:03 GMT 
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-08-04T10:20:09.007Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-08-04T10:20:09.014Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
/api/Trips/{id}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
14
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Trips/14' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/14
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Data For Id 14",
  "data": {
    "id": 14,
    "markerID": "828045",
    "destinationInfo": {
      "id": 6,
      "name": "hurghada",
      "imageUrl": "images/destinations/880df4ec-eb55-45cc-b440-0949f1d359da.webp",
      "isFeatured": true
    },
    "destination": null,
    "name": "Hurghada Orange Bay Island Snorkeling Cruise",
    "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "timeFrom": "08:00:00",
    "durationValue": 8,
    "durationTypeName": "Days",
    "adultPrice": 45,
    "childPrice": 22.5,
    "currencyName": "EUR",
    "isActive": true,
    "tripTypeName": "SEA",
    "createdBy": "pola samy",
    "createdAt": "2026-08-04T10:17:03.5838587",
    "highlights": [
      "Relax on the white sandy beaches of Orange Bay",
      "Snorkel at two different spots rich in coral reefs and marine life",
      "Enjoy water sports activities (banana boat and sofa ride)"
    ],
    "includes": [
      "Hotel pick-up and drop-off by air-conditioned van",
      "Open-buffet lunch and soft drinks on the boat",
      "Snorkeling equipment (mask, fins, and life jacket)"
    ],
    "excludes": [
      "National park preservation fee",
      "Gratuities and personal expenses"
    ],
    "whatToBring": [
      "Swimwear and a towel",
      "Sunglasses and sunscreen",
      "Camera or waterproof phone case"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "images": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:17:45 GMT 
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-08-04T10:20:09.023Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
/api/Trips/marker/{markerId}


Parameters
Cancel
Name	Description
markerId *
string
(path)
828045
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Trips/marker/828045' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/marker/828045
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Data For Marker 828045",
  "data": {
    "id": 14,
    "markerID": "828045",
    "destinationInfo": {
      "id": 6,
      "name": "hurghada",
      "imageUrl": "images/destinations/880df4ec-eb55-45cc-b440-0949f1d359da.webp",
      "isFeatured": true
    },
    "destination": null,
    "name": "Hurghada Orange Bay Island Snorkeling Cruise",
    "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
    "timeFrom": "08:00:00",
    "durationValue": 8,
    "durationTypeName": "Days",
    "adultPrice": 45,
    "childPrice": 22.5,
    "currencyName": "EUR",
    "isActive": true,
    "tripTypeName": "SEA",
    "createdBy": "pola samy",
    "createdAt": "2026-08-04T10:17:03.5838587",
    "highlights": [
      "Relax on the white sandy beaches of Orange Bay",
      "Snorkel at two different spots rich in coral reefs and marine life",
      "Enjoy water sports activities (banana boat and sofa ride)"
    ],
    "includes": [
      "Hotel pick-up and drop-off by air-conditioned van",
      "Open-buffet lunch and soft drinks on the boat",
      "Snorkeling equipment (mask, fins, and life jacket)"
    ],
    "excludes": [
      "National park preservation fee",
      "Gratuities and personal expenses"
    ],
    "whatToBring": [
      "Swimwear and a towel",
      "Sunglasses and sunscreen",
      "Camera or waterproof phone case"
    ],
    "availableDays": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "images": []
  }
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:18:16 GMT 
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
    "markerID": "string",
    "destinationInfo": {
      "id": 0,
      "name": "string",
      "imageUrl": "string",
      "isFeatured": true
    },
    "destination": "string",
    "name": "string",
    "description": "string",
    "timeFrom": "string",
    "durationValue": 0,
    "durationTypeName": "string",
    "adultPrice": 0,
    "childPrice": 0,
    "currencyName": "string",
    "isActive": true,
    "tripTypeName": "string",
    "createdBy": "string",
    "createdAt": "2026-08-04T10:20:09.031Z",
    "highlights": [
      "string"
    ],
    "includes": [
      "string"
    ],
    "excludes": [
      "string"
    ],
    "whatToBring": [
      "string"
    ],
    "availableDays": [
      "string"
    ],
    "images": [
      {
        "id": 0,
        "imageUrl": "string",
        "isPrimary": true
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
/api/Trips/type/{typeId}


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
typeId *
integer($int32)
(path)
2
Accept-Language
string
(header)
en
Execute
Clear
Responses
Curl

curl -X 'GET' \
  'https://travelapi.runasp.net/api/Trips/type/2' \
  -H 'accept: text/plain' \
  -H 'Accept-Language: en' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/type/2
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trips Data For Type Id 2",
  "data": [
    {
      "id": 14,
      "markerID": "828045",
      "destinationInfo": {
        "id": 6,
        "name": "hurghada",
        "imageUrl": "images/destinations/880df4ec-eb55-45cc-b440-0949f1d359da.webp",
        "isFeatured": true
      },
      "destination": null,
      "name": "Hurghada Orange Bay Island Snorkeling Cruise",
      "description": "Experience a full-day boat trip to the stunning Orange Bay island in the Red Sea. Enjoy snorkeling at vibrant coral reefs, relaxing on sandy beaches, and a delicious open-buffet lunch served on board.",
      "timeFrom": "08:00:00",
      "durationValue": 8,
      "durationTypeName": "Days",
      "adultPrice": 45,
      "childPrice": 22.5,
      "currencyName": "EUR",
      "isActive": true,
      "tripTypeName": "SEA",
      "createdBy": "pola samy",
      "createdAt": "2026-08-04T10:17:03.5838587",
      "highlights": [
        "Relax on the white sandy beaches of Orange Bay",
        "Snorkel at two different spots rich in coral reefs and marine life",
        "Enjoy water sports activities (banana boat and sofa ride)"
      ],
      "includes": [
        "Hotel pick-up and drop-off by air-conditioned van",
        "Open-buffet lunch and soft drinks on the boat",
        "Snorkeling equipment (mask, fins, and life jacket)"
      ],
      "excludes": [
        "National park preservation fee",
        "Gratuities and personal expenses"
      ],
      "whatToBring": [
        "Swimwear and a towel",
        "Sunglasses and sunscreen",
        "Camera or waterproof phone case"
      ],
      "availableDays": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "images": []
    }
  ]
}
Response headers
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:18:33 GMT 
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
      "markerID": "string",
      "destinationInfo": {
        "id": 0,
        "name": "string",
        "imageUrl": "string",
        "isFeatured": true
      },
      "destination": "string",
      "name": "string",
      "description": "string",
      "timeFrom": "string",
      "durationValue": 0,
      "durationTypeName": "string",
      "adultPrice": 0,
      "childPrice": 0,
      "currencyName": "string",
      "isActive": true,
      "tripTypeName": "string",
      "createdBy": "string",
      "createdAt": "2026-08-04T10:20:09.042Z",
      "highlights": [
        "string"
      ],
      "includes": [
        "string"
      ],
      "excludes": [
        "string"
      ],
      "whatToBring": [
        "string"
      ],
      "availableDays": [
        "string"
      ],
      "images": [
        {
          "id": 0,
          "imageUrl": "string",
          "isPrimary": true
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

DELETE
/api/Trips/{id}/deactivate


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
14
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://travelapi.runasp.net/api/Trips/14/deactivate' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/14/deactivate
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Deactivated Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:19:00 GMT 
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

PUT
/api/Trips/{id}/reactivate


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
14
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://travelapi.runasp.net/api/Trips/14/reactivate' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/14/reactivate
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Trip Reactivated Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:19:06 GMT 
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
/api/Trips/{id}/image


Parameters
Cancel
Reset
Name	Description
id *
integer($int32)
(path)
14
Request body

multipart/form-data
Images
array
Group 18.png-
DistinationM.png-
DistinationsD.png-
Add string item
Send empty value
Execute
Clear
Responses
Curl

curl -X 'POST' \
  'https://travelapi.runasp.net/api/Trips/14/image' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs' \
  -H 'Content-Type: multipart/form-data' \
  -F 'Images=@Group 18.png;type=image/png' \
  -F 'Images=@DistinationM.png;type=image/png' \
  -F 'Images=@DistinationsD.png;type=image/png'
Request URL
https://travelapi.runasp.net/api/Trips/14/image
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image Added Successfully",
  "data": [
    {
      "id": 33,
      "imageUrl": "images/Trips/3e52f286-d967-4c6b-b4df-c394c6f0f34a.webp"
    },
    {
      "id": 34,
      "imageUrl": "images/Trips/0d4678c6-c455-4d21-bf4e-9c0db172c935.webp"
    },
    {
      "id": 35,
      "imageUrl": "images/Trips/4609d2b6-feac-4251-a0ca-7b0ac6717be9.webp"
    }
  ]
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:19:32 GMT 
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
      "imageUrl": "string"
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

DELETE
/api/Trips/{id}/image/{imageId}


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
14
imageId *
integer($int32)
(path)
33
Execute
Clear
Responses
Curl

curl -X 'DELETE' \
  'https://travelapi.runasp.net/api/Trips/14/image/33' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/14/image/33
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Image Deleted Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:20:01 GMT 
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

PUT
/api/Trips/{id}/image/{imageId}/set-primary


Parameters
Cancel
Name	Description
id *
integer($int32)
(path)
14
imageId *
integer($int32)
(path)
34
Execute
Clear
Responses
Curl

curl -X 'PUT' \
  'https://travelapi.runasp.net/api/Trips/14/image/34/set-primary' \
  -H 'accept: text/plain' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InBvbGE1c2FteTU1QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEyMzQ0MzIxMjUiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NjQzOTIyNX0.uMb81UtfdtYcfM6q1vJ8pRCp8uUitz9z4en38ZsN8Rs'
Request URL
https://travelapi.runasp.net/api/Trips/14/image/34/set-primary
Server response
Code	Details
200	
Response body
Download
{
  "success": true,
  "message": "Primary Image Set Successfully",
  "data": ""
}
Response headers
 access-control-allow-origin: * 
 content-type: application/json; charset=utf-8 
 date: Tue,04 Aug 2026 10:20:09 GMT 
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