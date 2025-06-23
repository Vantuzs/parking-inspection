export const addProtocolImages = async(protocolId,images) =>{
    const url = `http://localhost:5000/api/parkOfficers/protocols/${protocolId}/images`

    const requestOptions = {
        method: 'POST',
        body: images
    }

    console.log(protocolId,images);

    try {
        return await (await fetch(url,requestOptions)).json()
    } catch (error) {
        console.log(error);
    }
}