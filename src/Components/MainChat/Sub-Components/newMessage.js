import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
        fontSize: 10
    },
}));

function NewMessageComponent(props) {

    const sendLocation = () => {
        console.log("LOCATION")
        if (!navigator.geolocation)
            return alert("GeoLocation is not supported by your browser")

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
            var msg = "https://google.com/maps?q=" + position.coords.latitude + "," + position.coords.longitude
            props.sendLocation(msg)
        })

    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <div className="message-options">
                <button className="attach-button" aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                    <AttachFileIcon color="primary" />
                </button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <List component="nav" >
                        <ListItem button onClick={sendLocation}>
                            <ListItemText primary="Send Location"  />
                        </ListItem>
                        <ListItem button onClick={() => {handleClose(); props.toggleFilePopUp()}}>
                            <ListItemText primary="Send file" />
                        </ListItem>
                        <ListItem button onClick={() => {handleClose(); props.toggleCodePopUp()}}>
                            <ListItemText primary="Send a code snippet" />
                        </ListItem>
                    </List>
                </Popover>
            </div>
            <div className="message-text">
                <TextField
                    name="new-message"
                    placeholder="New Message"
                    id="new-message-text-field"
                    variant="outlined"
                    multiline
                    value={props.currentMessage}
                    // rows={2}
                    onChange={props.messageOnChange}
                >

                </TextField>
            </div>
            <button className="send-button" onClick={props.sendOnClick}>
                Send
                    </button>
        </>
    )
}

export default NewMessageComponent;