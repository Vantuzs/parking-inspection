import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import ParkOfficer from '../../components/ParkOfficer/ParkOfficer';
import styles from './ParkOfficersPage.module.scss'
import CreateParkOfficer from '../../components/Modals/CreateParkOfficer';

const ParkOfficersPage = () => {
    const {parkOfficers,isLoading,error} = useSelector((state)=> state.parkOfficers);
    const dispatch = useDispatch();
    const [searchValue,setSearchValue] = useState('')
    const [createParkOfficerModalOpen,setCreateParkOfficerModalOpen] = useState(false)

    
    useEffect(()=>{
        dispatch(getParkOfficers());
    },[]);

    if(isLoading){
        return <div>LOADING {"=) =) =)"}</div>
    }

    if(error){
        return <div>ERROR HAPPEND</div>
    }
    
    const filtredParkOfficers = parkOfficers.filter(({fullName,badgeNumber,district})=>
        fullName.toLowerCase().includes(searchValue.toLowerCase())
        ||
        badgeNumber.toLowerCase().includes(searchValue.toLowerCase())
        ||
        district.toLowerCase().includes(searchValue.toLowerCase())
    );

    const parkOfficersCards = filtredParkOfficers.map(currentParkOfficer=> <ParkOfficer parkOfficer={currentParkOfficer} key={currentParkOfficer.id}/>)


    return (
        <section>
            <input 
             type='text'
             value={searchValue}
             onChange={({target:{value}})=>setSearchValue(value)}
             placeholder='Search'
            />
            <button onClick={()=>setCreateParkOfficerModalOpen(true)}>Create officer</button>
            <div>
            {parkOfficersCards}
            </div>
            {createParkOfficerModalOpen && <CreateParkOfficer open={createParkOfficerModalOpen} setIsOpen={setCreateParkOfficerModalOpen}/>}
        </section>
    );
}

export default ParkOfficersPage;
