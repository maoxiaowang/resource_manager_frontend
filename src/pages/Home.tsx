import React from 'react';
import {Breadcrumbs} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";

const Home: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" component={'h1'} sx={{marginY: 2}}>
                Home
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{
                marginTop: theme => theme.spacing(1),
                marginBottom: theme => theme.spacing(2)
            }}>
                <Typography color="text.primary">Home</Typography>
            </Breadcrumbs>
        </Container>
    )
}
export default Home;