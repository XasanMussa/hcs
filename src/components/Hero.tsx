import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import heroImage from "../images/hero-image.png";

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        pt: 10,
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" spacing={4}>
          {/* Left Column - Text Content */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 2,
                  color: "#333",
                  fontSize: "1rem",
                }}
              >
                Quality cleaning at a fair price.
              </Typography>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#333",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.2,
                }}
              >
                Specialized, efficient, and thorough cleaning services
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "#666",
                  fontSize: "1rem",
                  maxWidth: "500px",
                }}
              >
                We provide Performing cleaning tasks using the least amount of
                time, energy, and money.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#1db85c",
                    "&:hover": {
                      backgroundColor: "#169c4b",
                    },
                    textTransform: "none",
                    fontSize: "1rem",
                    px: 3,
                    py: 1,
                  }}
                >
                  Get Start Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#e0e0e0",
                    color: "#333",
                    "&:hover": {
                      borderColor: "#169c4b",
                      backgroundColor: "transparent",
                    },
                    textTransform: "none",
                    fontSize: "1rem",
                    px: 3,
                    py: 1,
                  }}
                >
                  View all Services
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Hero Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={heroImage}
              alt="Cleaning Service Team"
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
