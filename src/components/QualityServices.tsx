import React from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import qualityImage1 from "../images/quality-1.png";
import qualityImage2 from "../images/quality-2.png";

const QualityServices: React.FC = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Column - Text Content */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                color: "#666",
              }}
            >
              Affordable cleaning solutions
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: "bold",
                mb: 3,
                color: "#333",
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              High-Quality and Friendly Services at Fair Prices
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                color: "#666",
                lineHeight: 1.7,
              }}
            >
              We provide comprehensive cleaning services tailored to your needs.
              From residential cleaning services
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#1db85c",
                "&:hover": {
                  backgroundColor: "#169c4b",
                },
                textTransform: "none",
                px: 4,
                py: 1.5,
              }}
            >
              Get a quote
            </Button>
          </Grid>

          {/* Right Column - Images */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{ position: "relative", height: "100%", minHeight: "400px" }}
            >
              {/* First Image */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "60%",
                  zIndex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={qualityImage1}
                  alt="Cleaning Service"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
              {/* Second Image */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "60%",
                  zIndex: 2,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={qualityImage2}
                  alt="Cleaning Service"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default QualityServices;
