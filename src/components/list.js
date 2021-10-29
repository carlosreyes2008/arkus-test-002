import React from "react";
import { CircularProgress,
        Typography,
        Box,
        Modal,  
        Button} from "@mui/material";

import * as Controller from '../controllers/contacts';
import ContactCard from "./contactCard";
import ContactModal from "./contactModal";

const styles = {
    mainContainer:{
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 12,
        marginLeft: '12%',
        marginRight: '10%'
    },
    addContainer:{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 12,
        marginRight: '10%',
    },
    modal:{
        display: 'flex',
        justifyContent: 'center',
    },
    loading:{
        marginTop: 12,
        display: 'flex',
        justifyContent: 'center',
    }
}
export default function List() {

    const [load, isLoading] = React.useState(true);
    const [boot, didBoot] = React.useState(false);
    const [modal, showModal] = React.useState(false);

    const [contacts, setContacts] = React.useState([]);
    const [activeContact, setActiveContact] = React.useState(undefined);

    React.useEffect(() => {
        if(boot){
            return;
        }
        didBoot(true);
        handleLoading();
    });

    const handleLoading = async() => {
        isLoading(true);
        
        try{
            var result = await Controller.List();
        }catch(e){
            result = undefined;
        }

        if(result === undefined){
            console.log(`Error while fetching contacs`);
            return;
        }
        
        console.log(result);
        isLoading(false);
        setContacts(result.contacts);
    }

    const handleModalOpen = async(contact) => {
        showModal(true);
        setActiveContact(contact)
    }

    const handleModalClose = async() => {
        var doIt = await window.confirm('The changes will be lost. \nDo you want to proceed?');

        if(!doIt){
            return;
        }

        showModal(false);
        setActiveContact(undefined);
    }

    const handleModalSuccess = async() => {
        showModal(false);
        setActiveContact(undefined);
        setContacts([]);
        handleLoading();
    }

    const handelContactDelete = async() => {
        setContacts([]);
        handleLoading();
    }

  return (
    <>
        {load && (
            <Box
                style={styles.loading}
            >
                <Typography
                    variant='h5'
                >
                    Loading Contacts
                </Typography>

                <CircularProgress />
            </Box>
        )}

        {!load && (
            <Box
                style={styles.addContainer}
            >
                <Button
                    onClick={() => handleModalOpen(undefined)}
                >
                    Add Contact
                </Button>
            </Box>
        )}  
        <Box
            style={styles.mainContainer}
        >
            {contacts.map((item) => {
                return(
                    <ContactCard contact={item} onEdit={handleModalOpen} onDelete={handelContactDelete}/>
                );
            })}
        </Box>

        <Modal
            open={modal}
            onClose={handleModalClose}
            style={styles.modal}
        >
            <ContactModal contact={activeContact} onCancel={handleModalClose} onSuccess={handleModalSuccess}/>
        </Modal>
    </>
  );
}