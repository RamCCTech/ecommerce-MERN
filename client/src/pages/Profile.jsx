import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    currentUser && (
      <Container>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <div>
            <Typography variant="subtitle1">
              Name: {currentUser.name}
            </Typography>
            <Typography variant="subtitle1">
              Username: {currentUser.username}
            </Typography>
            <Typography variant="subtitle1">
              Email: {currentUser.email}
            </Typography>
            {/* Add more fields as needed */}
          </div>
        </Paper>
      </Container>
    )
  );
};

export default Profile;
