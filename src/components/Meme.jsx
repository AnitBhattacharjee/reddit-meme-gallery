// Meme.jsx
import React from "react";
import { Card, styled } from "@mui/material";

const StyledCard = styled(Card)({
    position: "relative",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    marginBottom: "30px",
    marginRight: "30px",
    overflow: "hidden",
    flex: "1 0 calc(25% - 60px)",

    "&:hover": {
        transform: "scale(1.5)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
    },
});

const Meme = ({ meme, onClick }) => {
    const handleClick = () => {
        onClick(meme);
    };

    return (
        <StyledCard onClick={handleClick}>
            <img
                src={meme.data.url}
                alt="meme"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </StyledCard>
    );
};

export default Meme;
