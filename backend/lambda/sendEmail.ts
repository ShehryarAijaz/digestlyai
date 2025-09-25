export async function handler(event: any) {
    console.log("Lambda triggered!", event);
    return { statusCode: 200, body: "Hello from Lambda!" };
  }
  