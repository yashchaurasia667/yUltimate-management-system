import dbconnect from "@/lib/dbconnect";
import { eventModel } from "@/lib/models";

type details = {
  name: string;
  description: string;
  organizer_id: string;
  banner: string;
  date: string;
  venue: string;
  type: string;
};

export async function POST(req: Request) {
  const { name, description, organizer_id, banner, date, venue, type }: details = await req.json();
  if (!name || !description || !organizer_id || !banner || !date || !type || !venue) {
    return Response.json({ success: false, message: "Bad Request: missing details" }, { status: 400 });
  }

  try {
    await dbconnect();
    const event = await eventModel.create({
      organizer: organizer_id,
      type: type,
      name: name,
      banner: banner,
      description: description,
      date: date,
      venue: venue,
    });

    if (!event) {
      throw new Error("Failed to create event, please try again.");
    }
    console.log(event);
    return Response.json({ success: true, message: JSON.stringify(event) });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: `Internal Server Error: ${error}` }, { status: 500 });
  }
}
