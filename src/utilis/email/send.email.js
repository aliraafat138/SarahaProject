import nodemailer from "nodemailer";

export const sendEmail = async({ to = "", text = "", subject = "", html = "" } = {}) => {
    const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });


    const info = await transporter.sendMail({
        from: `Route  ${process.env.EMAIL}`,
        to,
        subject,
        text,
        html
    });

    return info;
}