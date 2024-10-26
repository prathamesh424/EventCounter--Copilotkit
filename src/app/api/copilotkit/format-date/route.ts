import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const data = await req.json();
      const targetDate: string = data.targetDate;
      console.log("passing to api", targetDate)
      
    const todayDate = Date.now();

    if (!targetDate) {
      return NextResponse.json({
        error: "Target date must be provided.",
      });
    }
      const prompt = `make this "${targetDate}" time  and date into in this only format YYYY-MM-DDTHH:MM only give formatated time do not give any example or or any other test if any information not given about date use todays date ${todayDate} remember current year is 2024.
      For example, if the date is  "5pm", you can convert it to "2024-10-26T17:00". output should be YYYY-MM-DDTHH:MM only
    `;
    const result = await model.generateContent(prompt);
    const response = result.response;
    let output = response.text();
    console.log(output);
      let correctedText = output.replace(/```/g, ""); 
      console.log(correctedText);

    if (!correctedText) {
      return NextResponse.json({
        error: "Failed to generate the corrected text.",
      });
    }
    return NextResponse.json({
      correctedText,
    });
  } catch (error) {
    console.error("Error processing the date:", error);
    return NextResponse.json({
      error: "An error occurred while formatting the date.",
    });
  }
}
