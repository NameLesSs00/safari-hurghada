craete a plan to implment the admin page for the admins make sure we follow the same arch and also it works fine could you do that ?
# Admins API (cleaned)

Purpose
-------
This document defines the Admins API surface used by the admin pages. It provides concrete request/response schemas, authentication requirements, pagination defaults, validation rules, and example payloads.

Authentication & Authorization
------------------------------
- All endpoints require a bearer token in `Authorization: Bearer <token>` header.
- Only users with role `SuperAdmin` or `AdminManager` may create or update admins. Read endpoints require `Admin` role or higher.

Common response envelope
------------------------
All successful responses use the envelope:

```
{
  "success": true,
  "message": "string",
  "data": <object | array | primitive>
}
```

Error shape (used for 4xx/5xx)
--------------------------------
```
{
  "type": "https://example.com/probs/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more fields failed validation",
  "instance": "/api/Admins",
  "errors": {
    "email": ["Invalid email format"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

Schemas
-------

AdminDTO
```
{
  "id": 123,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "role": "Admin",
  "phone": "+201234567890",
  "nationality": "Egypt",
  "notes": "optional note",
  "createdAt": "2026-08-08T08:12:36.441Z"
}
```

CreateAdminDTO (POST /api/Admins)
```
{
  "firstName": "string",           // required, min 1
  "lastName": "string",            // required, min 1
  "email": "user@example.com",    // required, email format
  "phone": "+201234567890",       // optional, E.164 recommended
  "nationality": "string",        // optional
  "password": "string",           // required, min 8
  "notes": "string",              // optional
  "role": "Admin"                 // optional, default 'Admin'
}
```

UpdateAdminDTO (PUT /api/Admins)
```
{
  "id": 123,                        // required
  "firstName": "string",          // optional
  "lastName": "string",           // optional
  "phone": "string",              // optional
  "nationality": "string",        // optional
  "notes": "string",              // optional
  "role": "Admin"                 // optional
}
```

List response wrapper
```
{
  "success": true,
  "message": "Admins fetched",
  "data": {
    "items": [ <AdminDTO> ],
    "total": 123,
    "pageNumber": 1,
    "pageSize": 20
  }
}
```

Endpoints
---------

1) GET /api/Admins
- Description: Returns a paginated list of admins.
- Query parameters:
  - `pageNumber` (integer, default 1)
  - `pageSize` (integer, default 20, max 100)
  - `search` (string, optional) — searches firstName / lastName / email
  - `sort` (string, optional) — e.g. `createdAt:desc`
- Responses:
  - 200: List wrapper (see "List response wrapper")
  - 400: Validation error
  - 401: Unauthorized
  - 403: Forbidden

2) GET /api/Admins/{id}
- Description: Return a single admin by id.
- Path params: `id` (integer)
- Responses:
  - 200: `{ success, message, data: AdminDTO }`
  - 400/401/403/404

3) POST /api/Admins
- Description: Create a new admin user.
- Body: `CreateAdminDTO` (JSON)
- Responses:
  - 201: `{ success: true, message: 'Created', data: { id: <newId> } }`
  - 400: Validation errors (e.g., email already exists)
  - 401/403

4) PUT /api/Admins
- Description: Update an existing admin.
- Body: `UpdateAdminDTO` (JSON)
- Responses:
  - 200: `{ success: true, message: 'Updated', data: AdminDTO }`
  - 400/401/403/404

Validation rules (high level)
- `email`: required for create, must be a valid email, unique
- `password`: required for create, min length 8, recommend complexity
- `phone`: if present, must match E.164-ish pattern
- `role`: one of `Admin`, `SuperAdmin`, `AdminManager`

Pagination defaults & limits
- Default `pageNumber = 1`, `pageSize = 20`.
- Max `pageSize = 100` to avoid large payloads.

Mapping to code
---------------
Use existing backend hooks and API helpers where possible. Relevant files:
- [src/features/admin/auth/api.ts](src/features/admin/auth/api.ts#L1) contains auth helpers.
- [src/features/admin/blogs/api.ts](src/features/admin/blogs/api.ts#L1) shows pattern for admin APIs.

Suggested edits made
-------------------
- Fixed typos and clarified purpose.
- Added auth requirements and role rules.
- Replaced vague example payloads with formal `Create`/`Update`/`AdminDTO` schemas.
- Standardized error shape and list wrapper.
- Added pagination defaults, limits, and search/sort query params.

Next steps
----------
- I can apply these changes to the repo prompts file (already applied).
- Optionally: update or generate an OpenAPI snippet or add server-side request validation and DTOs in `src/features/admin`.

If you want, I will now:
- update server DTOs and validation code to match these schemas, or
- produce an OpenAPI YAML/JSON file for import.


DELETE
/api/Admins/{id}


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