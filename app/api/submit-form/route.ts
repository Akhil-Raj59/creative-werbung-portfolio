import { NextRequest, NextResponse } from "next/server";
import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { formatInTimeZone } from 'date-fns-tz';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, projectType, description } = body;

        
        if (!fullName || !email || !projectType || !description) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        
        const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID!, serviceAccountAuth);
        await doc.loadInfo(); 

        
        const sheet = doc.sheetsByTitle['submissions']; 
        
        if (!sheet) {
            throw new Error("Sheet tab 'submissions' not found");
        }

        
        await sheet.addRow({
            "Full Name": fullName,
            "Email": email,
            "Project Type": projectType,
            "Description": description,
            "Date": formatInTimeZone(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy hh:mm aa')
        });

        return NextResponse.json({ success: true, message: "Form submitted successfully" });

    } catch (error: any) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: error.message || "Failed to submit" }, { status: 500 });
    }
}