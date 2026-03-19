import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import setRoutes from "./routes/routeController.js";
import errorHandler from './utils/ErrorHandler/errorhandler.js';
import { connectDB } from "./config/MySqldbconfig.js";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy } from "passport-facebook";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
const app = express();
// import { createBullBoard } from "@bull-board/api";
// import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
// import { sendEmailQueue } from "./communication/queues/sendEmails.js";
// import { sendSmsQueue } from "./communication/queues/sendSms.js";
// import { listingModerationRecheckQueue } from "./communication/queues/listingModerationRecheck.js";
// import { listingModerationQueue } from "./communication/queues/listingModeration.js";
// import { sendWebNotificationQueue } from "./communication/queues/sendWebNotification.js";
// import {IndexListingQueue} from "./communication/queues/indexListingQueue.js";
// import {IndexDeletingQueue} from "./communication/queues/indexDeletingQueue.js"

// Ensure port is a number
const port = parseInt(process.env.PORT, 10) || 8000;
console.log("PORT variable:", process.env.PORT);
console.log("Starting server on port:", port);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

// createBullBoard({
//   queues: [new BullMQAdapter(sendEmailQueue),
//     new BullMQAdapter(sendSmsQueue),
//     new BullMQAdapter(listingModerationQueue),
//     new BullMQAdapter(sendWebNotificationQueue),
//     new BullMQAdapter(IndexListingQueue),
//     new BullMQAdapter(listingModerationRecheckQueue),
//   new BullMQAdapter(IndexDeletingQueue)],
//   serverAdapter,
// });

// app.use("/admin/queues", serverAdapter.getRouter());


// Swagger Options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Yardat API",
      version: "1.0.0",
      description: "API documentation for Yardat using Swagger",
    },
    servers: [
      { url: process.env.BACKEND_URL }
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/swagger", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Swagger UI</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          SwaggerUIBundle({
  url: window.location.origin + '/swagger.json',
  dom_id: '#swagger-ui'
});
        </script>
      </body>
    </html>
  `);
});

app.get("/swagger.json", (req, res) => {
  res.json(swaggerDocs);
});


app.use(passport.initialize());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.BACKEND_URL+"/api/v1/user/google/callback",
//     },
//     async (_, __, profile, done) => {
//       // Build a consistent user object
//       const user = {
//         provider: "google",
//         id: profile.id,
//         name: profile.displayName,
//         email: profile.emails?.[0]?.value,
//         avatar: profile.photos?.[0]?.value,
//       };
//       return done(null, user);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.BACKEND_URL+"/api/v1/user/facebook/callback",
//       profileFields: ["id", "displayName", "emails", "photos"],
//     },
//     async (_, __, profile, done) => {
//       const user = {
//         provider: "facebook",
//         id: profile.id,
//         name: profile.displayName,
//         email: profile.emails?.[0]?.value,
//         avatar: profile.photos?.[0]?.value,
//       };
//       return done(null, user);
//     }
//   )
// );

// App routes
app.use(setRoutes());

// Status endpoints
app.get("/", (req, res) => res.send("Auth working"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// Remove sensitive headers
app.use((req, res, next) => {
  res.removeHeader("x-powered-by");
  res.removeHeader("server");
  next();
});

// Error handler
app.use(errorHandler);

// Connect to database
connectDB();

// Start server on all interfaces (0.0.0.0) for Docker
// app.listen(port, '0.0.0.0', () => {
//   console.log(`Auth Server listening at http://localhost:${port}`);
// });

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
