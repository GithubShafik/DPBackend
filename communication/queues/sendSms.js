import pkg from "bullmq";
const { Queue } = pkg;
import connection from "../../config/redis.js";
export const sendSmsQueue = new Queue("send-sms", { connection });
