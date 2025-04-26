import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

interface PricingPlan {
  title: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    title: "BASIC PACKAGE",
    price: "59.00",
    period: "Monthly",
    features: [
      "Dusting of all surfaces",
      "Sweeping and mopping floors",
      "Vacuuming carpets and rugs",
      "Cleaning of kitchen surfaces",
      "Cleaning of bathroom surfaces",
      "Emptying trash bins",
    ],
  },
  {
    title: "ENTERPRISE PACKAGE",
    price: "69.00",
    period: "Monthly",
    features: [
      "All services in the Basic Plan",
      "Detailed dusting",
      "Wiping down of kitchen appt",
      "Cleaning inside the microwave",
      "Changing bed linens",
      "Spot cleaning walls and doors",
    ],
    isPopular: true,
  },
  {
    title: "PREMIUM PACKAGE",
    price: "99.00",
    period: "Monthly",
    features: [
      "All services in the Clean Plan",
      "Deep cleaning of kitchen appt",
      "baseboards, door frames, & vents",
      "Organization of closets pantries",
      "Carpet, upholstery spot cleaning",
      "Detailed bathroom cleaning",
    ],
  },
];

const Services: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<string>("monthly");

  const handleBillingPeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: string
  ) => {
    if (newPeriod !== null) {
      setBillingPeriod(newPeriod);
    }
  };

  return (
    <Box
      id="services"
      sx={{
        py: 6,
        backgroundColor: "#1db85c",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
        backgroundSize: "100% 50px",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 1,
              fontSize: "1rem",
            }}
          >
            Our Pricing
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              mb: 3,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
              lineHeight: 1.2,
            }}
          >
            Choose From Our Lowest Plans and Prices
          </Typography>

          <ToggleButtonGroup
            value={billingPeriod}
            exclusive
            onChange={handleBillingPeriodChange}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "3px",
              borderRadius: "50px",
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: "50px !important",
                color: "white",
                px: 3,
                py: 0.75,
                fontSize: "0.9rem",
                textTransform: "none",
                "&.Mui-selected": {
                  backgroundColor: "white",
                  color: "#1db85c",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              },
            }}
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 3,
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    textAlign: "center",
                    fontWeight: "600",
                    mb: 2.5,
                    fontSize: "1rem",
                  }}
                >
                  {plan.title}
                </Typography>
                <Box
                  sx={{
                    backgroundColor: plan.isPopular
                      ? "#1db85c"
                      : "rgba(29, 184, 92, 0.1)",
                    borderRadius: 2,
                    p: 2,
                    textAlign: "center",
                    mb: 2.5,
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "0.9rem",
                      color: plan.isPopular ? "white" : "#1db85c",
                      verticalAlign: "top",
                      mt: 1,
                      display: "inline-block",
                    }}
                  >
                    $
                  </Typography>
                  <Typography
                    variant="h3"
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color: plan.isPopular ? "white" : "#1db85c",
                      mx: 1,
                      fontSize: "2.5rem",
                    }}
                  >
                    {plan.price}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      color: plan.isPopular ? "white" : "#1db85c",
                      fontSize: "0.9rem",
                    }}
                  >
                    /{plan.period}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3, flexGrow: 1 }}>
                  {plan.features.map((feature, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          fontSize: "0.9rem",
                        }}
                      >
                        • {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  variant={plan.isPopular ? "contained" : "outlined"}
                  fullWidth
                  sx={{
                    py: 1,
                    textTransform: "none",
                    backgroundColor: plan.isPopular ? "#1db85c" : "transparent",
                    borderColor: "#1db85c",
                    color: plan.isPopular ? "white" : "#1db85c",
                    fontSize: "0.9rem",
                    "&:hover": {
                      backgroundColor: plan.isPopular
                        ? "#169c4b"
                        : "rgba(29, 184, 92, 0.1)",
                      borderColor: "#1db85c",
                    },
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
