import React, {useState} from 'react';
import styles from './ParkOfficer.module.scss'
import { useDispatch } from 'react-redux';
import { deleteParkOfficer,getParkOfficers,dismissParkOfficer } from '../../redux/slices/parkOfficerSlice';
import DeleteConfirmation from '../Modals/DeleteConfirmation';
import UpdateParkOfficer from '../Modals/UpdateParkOfficer';
import CreateParkOfficerProtocol from '../Modals/CreateParkOfficerProtocol';
import { useNavigate } from 'react-router-dom';

const ParkOfficer = ({ parkOfficer }) => {
    const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] = useState(false)
    const [updateParkOfficerModalOpen,setUpdateParkOfficerModalOpen] = useState(false)
    const [createParkOfficerProtocolModalOpen,setCreateParkOfficerProtocolModalOpen] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteHandler = async() =>{
        await dispatch(deleteParkOfficer(parkOfficer.id))
        await dispatch(getParkOfficers())
    }

    const dismissHandler = async() =>{
        await dispatch(dismissParkOfficer(parkOfficer.id))
        await dispatch(getParkOfficers())
    }

    const viewProtocolsHandler = ()=>{
        navigate(`/protocols/${parkOfficer.id}/${parkOfficer.fullName}`)
    }



    return (
        <article className={styles['card-wrapper']}>
            <h1>{parkOfficer.fullName}</h1>
            <p>Budge number: {parkOfficer.badgeNumber}</p>
            <p>District: {parkOfficer.district}</p>
            <p>{parkOfficer.isWorked ? 'Worked':'Not worked'}</p>

            <button onClick={viewProtocolsHandler}>View Protocols</button>

            <button onClick={()=> setDeleteConfirmationModalOpen(true)}>Delete</button>
            {deleteConfirmationModalOpen && <DeleteConfirmation open={deleteConfirmationModalOpen}
            setIsOpen={setDeleteConfirmationModalOpen}
            officerFullName={parkOfficer.fullName}
            deleteCallback={deleteHandler}/>
            }

            <button onClick={()=>setUpdateParkOfficerModalOpen(true)}>Edit</button>
            {updateParkOfficerModalOpen && <UpdateParkOfficer open={updateParkOfficerModalOpen} setIsOpen={setUpdateParkOfficerModalOpen} officer={parkOfficer}/>}
            
            {parkOfficer.isWorked && <button onClick={dismissHandler}>Dismiss</button>}

            <button onClick={()=>setCreateParkOfficerProtocolModalOpen(true)}>Create Protocol</button>
            {createParkOfficerProtocolModalOpen && <CreateParkOfficerProtocol open={createParkOfficerProtocolModalOpen} setIsOpen={setCreateParkOfficerProtocolModalOpen} parkOfficerId={parkOfficer.id}/>}
        </article>
    );
}

export default ParkOfficer;
