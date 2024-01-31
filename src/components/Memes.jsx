// Memes.jsx
import React, { useEffect, useState } from "react";
import { Grid, Fab } from "@mui/material";
import Meme from "./Meme";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { getMemes } from "../services/api";
import Loader from "./Loader";
//import "./Memes.css";

const Memes = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getMemes();
      setMemes((prevMemes) => [...prevMemes, ...response.data.children.map((meme) => ({ data: meme.data, isSelected: false }))]);
    } catch (error) {
      console.error("Error fetching more memes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch more data initially

  useEffect(() => {
    const handleScroll = () => {
      // Check if the user is near the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200 // Adjust this value as needed
      ) {
        fetchData();
      }

      // Check if the user has scrolled down, and show/hide the scroll-to-top button
      const scrollButton = document.getElementById("scroll-to-top-button");
      if (scrollButton) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollButton.style.display = "block";
        } else {
          scrollButton.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]); // Fetch more data on scroll only when not already loading

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageClick = (clickedImage) => {
    const updatedMemes = memes.map((meme) => ({
      ...meme,
      isSelected: meme === clickedImage ? !meme.isSelected : false,
    }));

    setMemes(updatedMemes);
    setSelectedImage(clickedImage.isSelected ? null : clickedImage);
  };

  return (
    <div>
      <Grid container margin={3}>
        {memes.map((meme, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Meme meme={meme} onClick={handleImageClick} />
          </Grid>
        ))}
      </Grid>
      {loading && <Loader />}
      {selectedImage && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 2 }}>
          <Fab
            color="primary"
            onClick={() => handleImageClick(selectedImage)}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      )}
      <Fab
        id="scroll-to-top-button"
        color="primary"
        aria-label="scroll-to-top"
        style={{ position: "fixed", bottom: "20px", right: "20px", display: "none" }}
        onClick={scrollToTop}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </div>
  );
};

export default Memes;
