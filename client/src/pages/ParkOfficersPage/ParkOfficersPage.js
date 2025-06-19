import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getParkOfficers } from '../../redux/slices/parkOfficerSlice';
import ParkOfficer from '../../components/ParkOfficer/ParkOfficer';

const ParkOfficersPage = () => {
    const {parkOfficers,isLoading,error} = useSelector((state)=> state.parkOfficers);
    const dispatch = useDispatch();

    
    useEffect(()=>{
        dispatch(getParkOfficers());
    },[]);

    if(isLoading){
        return <div>LOADING =) =) =)</div>
    }

    if(error){
        return <div>ERROR HAPPEND</div>
    }
    
    const parkOfficersCards = parkOfficers.map(currentParkOfficer=> <ParkOfficer parkOfficer={currentParkOfficer} key={currentParkOfficer.id}/>)

    return (
        <section>
            {parkOfficersCards}
        </section>
    );
}

export default ParkOfficersPage;
