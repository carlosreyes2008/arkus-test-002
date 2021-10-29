import React from "react";
import { Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    Box,
    Divider,
    TextField } from "@mui/material";

import * as Controller from '../controllers/contacts';

const styles = {
    card:{
        backgroundColor: '#F2F2F2',
        width: '50%',
        height: 400,
        elevation: 10,
        margin: '12%',
    },
    content:{
        display: 'flex',
        flexDirection: 'column',
    },
    input:{
        marginTop: 8,
    },
    yes:{
        backgroundColor: '#0000FF',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    no:{
        backgroundColor: '#dd0000',
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
}
export default function ContactModal(props) {

    const [boot, didBoot] = React.useState(false);

    const [contact, setContact] = React.useState({
        id: 0,
        name_first: '',
        name_last: '',
        email: '',
        image: '',
    });

    const [label, setLabel] = React.useState('Create');

    React.useEffect(() => {
        if(boot){
            return;
        }

        didBoot(true);
        
        if(props.contact !== undefined)
        {
            console.log(props.contact)
            setContact({...props.contact, ['image']: ''});
            setLabel('Edit')
        }
    });

    const handleChanges = async(e) => {
        setContact({...contact,[e.target.name]:e.target.value});
    }

    const handleChangesFile = async(e) => {
        setContact({...contact,[e.target.name]:e.target.files[0]});
    }

    const handleConfirm = async() => {
        if(![contact.name_first, contact.name_last, contact.email].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        var data = new FormData();
        
        if(contact.id === 0){
            if(![contact.image].every(Boolean)){
                alert('All parameters are required');
                return;
            }
            data.append('image_name', '');
            data.append('image', contact.image);
        }
        else{
            data.append('image_name', props.contact.image);
            data.append('id', props.contact.id);
            if(contact.image !== ''){
                data.append('image', contact.image);
            }
        }

        data.append('name_first', contact.name_first);
        data.append('name_last', contact.name_last);
        data.append('email', contact.email);

        if(contact.id === 0){
            proccessCreate(data);
        }else{
            porccessEdit(data);
        }
    }

    const proccessCreate = async(data) =>{
        try{
            var result = await Controller.Create(data);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            console.log(`Error while creating contact. Please, try again`);
            return;
        }

        alert(result.msg);

        if(result.succes){
            props.onSuccess();
        }
    }

    const porccessEdit = async(data) =>{
        try{
            var result = await Controller.Update(data);
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            console.log(`Error while updating contact. Please, try again`);
            return;
        }

        alert(result.msg);

        if(result.succes){
            props.onSuccess();
        }
    }

    return (
        <Card
            style={styles.card}
        >
            <CardContent
                style={styles.content}
            >
                <Box>
                    <Typography
                        variant='h5'
                    >
                        {`${label} Contact`}
                    </Typography>
                </Box>
                
                <Divider />
                
                <TextField 
                    style={styles.input}
                    label='First Name'
                    name='name_first'
                    value={contact.name_first}
                    onChange={handleChanges}
                />

                <TextField 
                    style={styles.input}
                    label='Last Name'
                    name='name_last'
                    value={contact.name_last}
                    onChange={handleChanges}
                />

                <TextField 
                    style={styles.input}
                    label='E-Mail'
                    name='email'
                    value={contact.email}
                    onChange={handleChanges}
                />

                <Typography
                    style={styles.input}
                >
                    Contact Photo
                </Typography>

                <TextField 
                    type='file'
                    name='image'
                    onChange={handleChangesFile}
                />

            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    style={styles.yes}
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
                <Button
                    fullWidth
                    style={styles.no}
                    onClick={props.onCancel}
                >
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
}