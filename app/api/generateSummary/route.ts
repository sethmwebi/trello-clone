import openai from "../../../openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const { todos } = await request.json();

	// Communicate with OpenAI
	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		temperature: 0.8,
		n: 1,
		stream: false,
		messages: [
			{
				role: "system",
				content:
					"When responding, welcome the user always as Mr Mwebi and say welcome to the SETHOZ Todo App! Limit the response to 200 characters",
			},
			{
				role: "user",
				content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as Todo, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
					todos,
				)}`,
			},
		],
	});

	const { data } = response;

	return NextResponse.json(data.choices[0].message)
}
