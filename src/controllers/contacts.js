import * as API from '../api/contacts';

export const List = async() => {
    try{
        var result = await API.List();
    }catch(e){
        console.log(`CONTROLLER ERROR: List \n${e}`);
        return undefined;
    }

    return result;
}

export const Create = async(data) => {
    try{
        var result = await API.Create(data);
    }catch(e){
        console.log(`CONTROLLER ERROR: Create \n${e}`);
        return undefined;
    }

    return result;
}

export const Update = async(data) => {
    try{
        var result = await API.Update(data);
    }catch(e){
        console.log(`CONTROLLER ERROR: Update \n${e}`);
        return undefined;
    }

    return result;
}

export const Delete = async(data) => {
    try{
        var result = await API.Delete(data);
    }catch(e){
        console.log(`CONTROLLER ERROR: Delete \n${e}`);
        return undefined;
    }

    return result;
}