import { app, InvocationContext, Timer } from "@azure/functions";
import axios from "axios";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export async function QRNPGAuthTrigger(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Timer function processed request.");

  // Fetch the API endpoint from environment variables
  const apiEndpoint =
    process.env.API_ENDPOINT ||
    "https://qrpaybackend.azurewebsites.net/app/api/payment/auth";

  if (!apiEndpoint) {
    context.log("API endpoint is not defined in the environment variables.");
    return;
  }

  const requestOptions = {
    method: "POST", // or 'GET', 'PUT', etc.
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if needed
    },
    data: {
      // Your request payload here (for POST/PUT requests)
    },
  };

  try {
    const response = await axios(apiEndpoint, requestOptions);
    context.log("API call successful:", response.data);
  } catch (error) {
    context.log("API call failed:", error.message);
  }
}

app.timer("QRNPGAuthTrigger", {
  schedule: "0 0 1 * * *",
  handler: QRNPGAuthTrigger,
});
