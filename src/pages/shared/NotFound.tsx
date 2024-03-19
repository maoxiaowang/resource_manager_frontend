import { Container, Stack } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

const NotFound: React.FC = () => {
  return (
      <Container>
      <Stack>
        <Box>
          <Typography variant="h4" component="h1" sx={{marginY: 2}}>
            404 - Not Found
          </Typography>
          <Typography component="p">Sorry, the page you are looking for might not exist.</Typography>
        </Box>
      </Stack>
    </Container>
  )
};

export default NotFound;