import React from "react";
import { Box } from "@mui/material";

const Map: React.FC = () => (
  <Box
    sx={{
      width: "100vw",
      position: "relative",
      left: "50%",
      right: "50%",
      ml: "-50vw",
      mr: "-50vw",
      my: 4,
    }}
  >
    <iframe
      title="Company Location Map"
      src="https://www.google.com/maps?q=Hodan+Taleex+Mogadishu+Somalia&output=embed"
      width="100%"
      height="350"
      style={{ border: 0, display: "block" }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </Box>
);

export default Map;
