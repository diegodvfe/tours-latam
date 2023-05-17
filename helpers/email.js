import nodemailer from "nodemailer";

const emailRegister = async (datos) => {
   const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,
      },
   });

   const { email, nombre, token } = datos;

   //    Enviar emails

   await transport.sendMail({
      from: "tourlatam.com",
      to: email,
      subject:
         "Tour Latam - Confirm your register",
      text: "Confirm your account and start enjoy the trip",
      html: `<p>Hello ${nombre}, start enjoy your trip with us. We are excited to have you.</p>
    
        <p> Click here to know more your travel and check our new tours. For your first time we offer a disccount of 15% for your next trip</p>

        <p>
        <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3004}/auth/confirmar-cuenta/${token}"> Confirm your account</a>
        </p>

        <p>If you dindt create an account, here is another link</p>
    `
   });
};

export { emailRegister };
