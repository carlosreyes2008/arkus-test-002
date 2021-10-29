import React from "react";
import { Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    Box, 
    darkScrollbar} from "@mui/material";

import * as Controller from '../controllers/contacts';

const styles = {
    card:{
        backgroundColor: '#F2F2F2',
        flexBasis: '23%',
        elevation: 10,
        margin: 8,
    },
    imageContainer:{
        display: 'flex',
    },
    image:{
        width: '100%'
    }
}

export default function ContactCard(props) {

    const [boot, didBoot] = React.useState(false);

    const [contact, setContact] = React.useState({
        id: 0,
        name_first: '',
        name_last: '',
        email: '',
        image: '',
    });

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        setContact({...props.contact});
    });

    const handleDelete = async() => {
        var doIt = await window.confirm('The contact will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        var data = new FormData();
        data.append('id', contact.id);
        data.append('image', contact.image);

        try{
            var result = await Controller.Delete(data);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            alert('Error while deleting contact. Please, try again');
            return;
        }

        alert(result.msg);

        if(result.succes){
            props.onDelete();
        }
    }

    return (
        <Card
            style={styles.card}
        >
            <CardContent>
                <Box
                    style={styles.imageContainer}
                >
                    <img 
                        style={styles.image}
                        src={`http://192.168.100.15/img/${contact.image}`}
                    />
                </Box>
                <Box>
                    <Typography
                        variant='h5'
                    >
                        {`${contact.name_first} ${contact.name_last}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant='h6'
                    >
                        {contact.email}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    onClick={() => props.onEdit(contact)}
                >
                    EDIT
                </Button>
                <Button
                    fullWidth
                    onClick={handleDelete}
                >
                    DELETE
                </Button>
            </CardActions>
        </Card>
    );
}