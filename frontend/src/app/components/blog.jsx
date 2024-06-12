import { Box, Container, Paper } from '@mui/material'
import React from 'react'

const Blogs = () => {
    return (
        <Container component="main" maxWidth="md">
            <Paper sx={{ padding: 10 }} elevation={4}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >blog
                
                </Box>
            </Paper>
        </Container>

    )
}

export default Blogs