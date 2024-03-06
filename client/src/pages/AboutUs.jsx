import React from "react";
import { Container, Paper, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: (theme) => theme.spacing(4),
          marginTop: (theme) => theme.spacing(4),
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          This website is developed by Ram Agrawal to demonstrate the learning
          of HTML, CSS, and JavaScript. It serves as a showcase of acquired
          skills in web development, emphasizing the practical application of
          HTML for structuring content, CSS for styling and layout, and
          JavaScript for creating dynamic and interactive features. Through this
          project, I aim to convey the journey of learning and applying these
          technologies in web development.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          The website is designed to function as an e-commerce platform,
          providing users with the ability to explore and purchase a diverse
          range of products. The product pages showcase various items, each
          presented with detailed information, including images, prices, and
          descriptions. Users can easily navigate through the website, browse
          products, and make secure transactions.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          Additionally, the website features a comprehensive user experience
          with dedicated sections such as the profile area, where users can
          manage their personal information and track their order history. The
          sign-in and sign-up pages allow for seamless account creation and
          authentication, ensuring a secure and personalized experience for each
          user.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          The about section provides insights into the background of this
          project, detailing the motivation and goals behind its creation. For
          any inquiries or assistance, users can utilize the contact page,
          facilitating communication and feedback.
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: (theme) => theme.spacing(2) }}
        >
          Through this multifaceted website, I aim to not only showcase
          technical skills but also create a user-friendly and engaging platform
          that reflects the practical application of web development concepts in
          a real-world context.
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutUs;
