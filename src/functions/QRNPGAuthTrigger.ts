import { app, InvocationContext, Timer } from "@azure/functions";

export async function QRNPGAuthTrigger(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Timer function processed request.');
}

app.timer('QRNPGAuthTrigger', {
    schedule: '0 0 1 * * *',
    handler: QRNPGAuthTrigger
});
