import React from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

interface DefaultBackdropProps {
    open: boolean,
    message?: string
}

const DefaultBackdrop: React.FC<DefaultBackdropProps> = ({open, message = 'Loading ...'}: DefaultBackdropProps) => {
    return (
        <Backdrop open={open} sx={{zIndex: (theme) => theme.zIndex.drawer + 101}}>
            {/* Modal 1300, Drawer 1200 */}
            <CircularProgress sx={{color: "#fff"}}/>
            {message && <Typography sx={{color: '#fff', marginLeft: 2}}>{message}</Typography>}
        </Backdrop>
    )
}

export default DefaultBackdrop;