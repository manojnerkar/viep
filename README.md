# viep
I'll help you build this Virtual Industry Experience Platform. This is a comprehensive project with multiple modules. Let me create a structured development roadmap and starter code for you.


"test": "echo \"Error: no test specified\" && exit 1",


Public Routes
These routes are accessible without authentication.

GET /health
POST /api/auth/register
POST /api/auth/verify-otp
POST /api/auth/login
POST /api/auth/resend-otp
GET /api/payments/plans
GET /api/payments/plans/:id
GET /api/certificates/verify/:certificateId
Private Routes
These routes require a valid JWT token for authentication. Routes under /api/admin also require the user to have an admin role.

Auth

<<<<<<< HEAD
GET /api/auth/me hello
=======
GET /api/auth/me
>>>>>>> 617b515b (Initial commit)
POST /api/auth/logout
User

GET /api/users/profile
PUT /api/users/profile
Projects

GET /api/projects
GET /api/projects/:id
POST /api/projects
Tasks

GET /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id/status
POST /api/tasks/:id/submit
Payments

POST /api/payments/checkout
POST /api/payments/verify
GET /api/payments/my-payments
Subscriptions

GET /api/subscriptions/status
GET /api/subscriptions/my-subscriptions
POST /api/subscriptions/:id/cancel
Certificates

GET /api/certificates/my-certificates
GET /api/certificates/:id
POST /api/certificates/download/:id
Admin

GET /api/admin/stats
GET /api/admin/users
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
POST /api/admin/plans
PUT /api/admin/plans/:id
GET /api/admin/payments
POST /api/admin/certificates/:id/revoke
