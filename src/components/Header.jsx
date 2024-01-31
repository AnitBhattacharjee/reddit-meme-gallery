// Header.jsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';

const Header = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = currentScrollPos > prevScrollPos;
            setPrevScrollPos(currentScrollPos);

            if (isScrollingDown) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const headerStyle = {
        backgroundColor: isVisible ? '#ff4500' : '#993399',
        transition: 'background-color 0.3s',
        position: 'sticky',
        borderBottom: isVisible ? '1px solid #ddd' : 'none',
    };

    const logoStyle = {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        textDecoration: 'none',
    };

    const iconStyle = {
        marginRight: '8px',
        fontSize: '24px', // Increase the icon size
    };

    return (
        <AppBar style={headerStyle}>
            <Toolbar>
                <a href="/" style={logoStyle}>
                    <RedditIcon style={iconStyle} />
                    <Typography variant="h6">
                        My Meme Gallery
                    </Typography>
                </a>

                {/* GitHub Icon */}
                <div style={{ marginLeft: 'auto' }}>
                    <Tooltip title="My GitHub Repository">
                        <IconButton
                            color="inherit"
                            component="a"
                            href="https://github.com/AnitBhattacharjee/reddit-meme-gallery"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon style={{ fontSize: '32px' }} /> {/* Increase the icon size */}
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
