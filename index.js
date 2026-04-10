import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import setRoutes from "./routes/routeController.js";
import errorHandler from './utils/ErrorHandler/errorhandler.js';
import { connectDB } from "./config/MySqldbconfig.js";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy } from "passport-facebook";
import swaggerJsDoc  from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET","POST","PUT","DELETE","PATCH"],
  }
});

// Socket.IO logic
const notifiedOrders = new Map(); // Track notified orders: { orderId: Set([dpId1, dpId2]) }

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("join", (data) => {
    const { role, partnerId } = data;
    if (role === 'partner' && partnerId) {
      socket.join(`partner_${partnerId}`);
      console.log(`✅ Partner joined: ID ${partnerId}, Socket ${socket.id}`);
    }
  });

  socket.on("disconnect", () => {
    console.log("🔌 User disconnected:", socket.id);
  });

  // Handle Order Acceptance from Partner App
  socket.on("dp_accepted_order", async (data) => {
    console.log(`[Socket] 🤝 Partner accepted order: ${data.orderId} for customer: ${data.customerId}`);
    
    try {
        // Notify Customer Backend (Port 5000)
        // In local dev, we use localhost or the specified IP
        const customerBackendUrl = process.env.CUSTOMER_BACKEND_URL || "http://localhost:5000";
        
        console.log(`[Internal Bridge] 🌉 Forwarding acceptance to ${customerBackendUrl}...`);
        
        const response = await axios.post(`${customerBackendUrl}/api/internal/customer/notify-accepted`, data);
        
        console.log(`[Internal Bridge] ✅ Customer Backend response:`, response.data);
        
    } catch (error) {
        console.error(`[Internal Bridge] ❌ Failed to forward acceptance:`, error.response?.data || error.message);
    }
  });
});


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
const port = parseInt(process.env.PORT, 10) || 8001;
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

// --- Internal API Bridge for Cross-Backend Communication ---
app.post("/api/internal/notify-partners", (req, res) => {
    const { partnerIds, eventData } = req.body;
    
    if (!partnerIds || !Array.isArray(partnerIds) || !eventData) {
        return res.status(400).json({ success: false, error: "Invalid payload: missing partnerIds or eventData" });
    }
    
    let notifiedCount = 0;
    partnerIds.forEach(id => {
        const roomName = `partner_${id}`;
        
        // Check if this partner has already been notified for this order
        if (!notifiedOrders.has(eventData.orderId)) {
            notifiedOrders.set(eventData.orderId, new Set());
        }
        
        const notifiedSet = notifiedOrders.get(eventData.orderId);
        
        if (!notifiedSet.has(id)) {
            // Only send if not already notified
            io.to(roomName).emit("new_order", eventData);
            notifiedSet.add(id);
            console.log(`[Internal API] 🔔 Emitted 'new_order' to room: ${roomName} for order: ${eventData.orderId}`);
            notifiedCount++;
        } else {
            console.log(`[Internal API] ⏭️ Partner ${id} already notified for order ${eventData.orderId}`);
        }
    });
    
    // Clean up old orders after 1 hour to prevent memory leak
    setTimeout(() => {
        notifiedOrders.delete(eventData.orderId);
    }, 3600000);
    
    res.status(200).json({ 
        success: true, 
        message: `Successfully emitted events to ${notifiedCount} partners` 
    });
});
// -----------------------------------------------------------
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
// httpServer.listen(port, '0.0.0.0', () => {
//   console.log(`Auth Server with Socket.IO listening at http://localhost:${port}`);
// });

httpServer.listen(port, '0.0.0.0', () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`🚀 Server running on port ${port}`);
  } else {
    console.log(`🚀 Server running locally on http://192.168.0.169:${port}`);
  }
});
export default app;