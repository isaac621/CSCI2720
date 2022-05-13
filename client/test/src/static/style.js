import { requirePropFactory } from "@mui/material";
import header from './header.jpg'
const Style = {
    pageContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
       
        flexDirection: 'column',
        padding: 0,
        margin: 0
    },

    header: {
        minHeight: '20px',
        height: '20vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${header})`,
        backgroundSize: 'cover',
    },

    footer: {
        
        py: 1,
        textAlign: 'center',
        bgcolor: 'textColor.main',
        color: 'textColor.contrast'
    },

    loginContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        width: '500px',
        height: '360px',
        padding: '13px',
        bgcolor: 'primary.dark'
    },

    mainSection: {
        width: '100vw',
        height: '100%',
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: 'primary.light',
        flexGrow: 1
    },

    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2
    },

    nav: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'flex-end',
        bgcolor: 'secondary.dark',
        py: .5
    },

    leftNav: {
        height: '100%',
        width: '10%',
        position: 'fixed',
        zIndex: '1',
        top: 0,
        left: 0,
        backgroundColor: 'secondary.darker',
        overflowX: 'hidden',
        paddingTop: '10%',
        transition: '2s'
    },

    mapContainer: {
        width: '500px',
        height: '400px'
    }
}

export default Style