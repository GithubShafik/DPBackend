import pkg from "bullmq";
const { Queue } = pkg;
import connection from "../../config/redis.js";
export const sendEmailQueue = new Queue("send-email", { connection });
