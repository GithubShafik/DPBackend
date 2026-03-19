import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const forwardRequestWithAuth = async (req, res, serviceURL) => {
  try {    
    // 🔁 Clone incoming request body
    const payload = {
      ...req.body,
      user: req.user,
      _meta: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },
    };
    
    // 🚀 Forward request
    const response = await axios({
      method: req.method,
      url: `${serviceURL}${req.originalUrl}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 3000000,
    });
    
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Forwarding Error:", error?.response?.data || error.message);

    return res.status(
      error?.response?.status || 500
    ).json({
      message: "Forwarding request failed",
      error: error?.response?.data || error.message,
    });
  }
};
export const forwardRequestWithOutAuth = async (req, res, serviceURL) => {
  try {    
    // 🔁 Clone incoming request body
    const payload = {
      ...req.body,
      _meta: {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      },
    };
    
    // 🚀 Forward request
    const response = await axios({
      method: req.method,
      url: `${serviceURL}${req.originalUrl}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 300000,
    });    
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Forwarding Error:", error?.response?.data || error.message);

    return res.status(
      error?.response?.status || 500
    ).json({
      message: "Forwarding request failed",
      error: error?.response?.data || error.message,
    });
  }
};

export const forwardMultiPartRequestWithAuth = async (req, res, serviceURL) => {
  try {
    const formData = new FormData();

    /**
     * 1️⃣ Append normal fields
     */
    Object.keys(req.body || {}).forEach((key) => {
      formData.append(key, req.body[key]);
    });

    /**
     * 2️⃣ Inject logged-in user & meta
     */
    formData.append("user", JSON.stringify(req.user));
    formData.append(
      "_meta",
      JSON.stringify({
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      })
    );

    /**
     * 3️⃣ Append files (supports single & multiple)
     * Works with Multer
     */
    if (req.file) {
      // single file
      formData.append(
        req.file.fieldname,
        fs.createReadStream(req.file.path),
        {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        }
      );
    }

    if (req.files) {
      // multiple files (array or object)
      if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
          formData.append(
            file.fieldname,
            fs.createReadStream(file.path),
            {
              filename: file.originalname,
              contentType: file.mimetype,
            }
          );
        });
      } else {
        // Multer fields format { fieldName: [files] }
        Object.values(req.files).flat().forEach((file) => {
          formData.append(
            file.fieldname,
            fs.createReadStream(file.path),
            {
              filename: file.originalname,
              contentType: file.mimetype,
            }
          );
        });
      }
    }

    /**
     * 4️⃣ Forward request
     */
    const response = await axios({
      method: req.method,
      url: `${serviceURL}${req.originalUrl}`,
      data: formData,
      headers: {
        ...formData.getHeaders(), // ✅ VERY IMPORTANT
        authorization: req.headers.authorization, // optional forward auth
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 30000,
    });

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Forwarding Error:", error?.response?.data || error.message);

    return res.status(error?.response?.status || 500).json({
      message: "Forwarding multipart request failed",
      error: error?.response?.data || error.message,
    });
  }
};
export const forwardMultiPartRequestWithOutAuth = async (req, res, serviceURL) => {
  try {
    const formData = new FormData();

    /**
     * 1️⃣ Append normal fields
     */
    Object.keys(req.body || {}).forEach((key) => {
      formData.append(key, req.body[key]);
    });

    /**
     * 2️⃣ Inject logged-in user & meta
     */
    formData.append(
      "_meta",
      JSON.stringify({
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      })
    );

    /**
     * 3️⃣ Append files (supports single & multiple)
     * Works with Multer
     */
    if (req.file) {
      // single file
      formData.append(
        "file",
        req.file.buffer,
        {
          filename: req.file.originalname,
          contentType: req.file.mimetype,
        }
      );
    }

    if (req.files) {
      // multiple files (array or object)
      if (Array.isArray(req.files)) {
        req.files.forEach((file) => {
          formData.append(
            file.fieldname,
            fs.createReadStream(file.path),
            {
              filename: file.originalname,
              contentType: file.mimetype,
            }
          );
        });
      } else {
        // Multer fields format { fieldName: [files] }
        Object.values(req.files).flat().forEach((file) => {
          formData.append(
            file.fieldname,
            fs.createReadStream(file.path),
            {
              filename: file.originalname,
              contentType: file.mimetype,
            }
          );
        });
      }
    }

    /**
     * 4️⃣ Forward request
     */
    console.log({formData,url:`${serviceURL}${req.originalUrl}`,method: req.method});
    
    const response = await axios({
      method: req.method,
      url: `${serviceURL}${req.originalUrl}`,
      data: formData,
      headers: {
        ...formData.getHeaders(), // ✅ VERY IMPORTANT
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: 30000,
    });
    console.log({response});
    
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Forwarding Error:", error?.response?.data || error.message);

    return res.status(error?.response?.status || 500).json({
      message: "Forwarding multipart request failed",
      error: error?.response?.data || error.message,
    });
  }
};
