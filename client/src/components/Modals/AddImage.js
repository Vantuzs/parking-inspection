import React,{useState} from 'react';
import Modal from 'react-modal';
import UploadImage from '../UploadImage/UploadImage';
import { addImagesToProtocol, } from '../../redux/slices/protocolSlice';
import { useDispatch } from 'react-redux';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'block',
  },
};

Modal.setAppElement('#root');

const AddImage = ({open,setIsOpen, protocolId}) => {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null);

    const uploadImageHandler = async ()=>{
        if(file){
            const formData = new FormData();
            [...file].forEach((currentImage)=>
                formData.append('images',currentImage)
            )
            console.log(formData);

            try {
                await dispatch(addImagesToProtocol({protocolId,images:formData}))
                await dispatch()
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <Modal
        isOpen={open}
        onRequestClose={()=>setIsOpen(false)}
        style={customStyles}
        >
            <h2>Add images</h2>
            <UploadImage setFile={setFile}/>
            {file && <button onClick={uploadImageHandler}>Upload</button>}
            <button onClick={()=>setIsOpen(false)}>Cancel</button>
        </Modal>
    );
}

export default AddImage;
