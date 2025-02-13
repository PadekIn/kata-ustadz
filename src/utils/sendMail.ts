import ejs from "ejs";
import { transporter } from "../configs/nodemailer";
import path from "path";

interface dataType {
    fullname?: string;
    url?: string;
};

export default async (emailFor: string, subject: string, mailFormat: string, data: dataType | string = "") => {
    // Path ke file EJS template
    const templatePath = path.join(__dirname, `../views/mail/${mailFormat}.ejs`);

    // Render EJS template dengan data
    const emailContent = await ejs.renderFile(templatePath, { data });

    // send mail with defined transport object
    const mailOption = {
        from: {
            name: "Tim Kata Ustadz",
            address: process.env.OUR_EMAIL || "default@example.com"
        },
        to: emailFor,
        subject,
        html: emailContent,
    };

    transporter.sendMail(mailOption);

    return true;
};