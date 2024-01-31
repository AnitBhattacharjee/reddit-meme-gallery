// Loader.jsx
import React from "react";
import { CircularProgress, Typography } from "@mui/material";

const Loader = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress color="primary" />
            <Typography variant="body1" style={{ marginTop: "10px", color: "#1a1a1a" }}>
                Loading more memes...
            </Typography>
        </div>
    );
};

export default Loader;
