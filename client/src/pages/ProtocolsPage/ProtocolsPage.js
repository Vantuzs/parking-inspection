import React, { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllProtocols } from '../../redux/slices/protocolSlice';
import Protocol from '../../components/Prorocol/Protocol';
import style from './ProtocolsPage.module.scss'

const ProtocolsPage = () => {
    const {protocols,isLoading,error} = useSelector((state)=> state.protocols);
    const dispatch = useDispatch();
    const [searchValue,setSearchValue] = useState('');

    useEffect(()=>{
        dispatch(getAllProtocols());
    },[])

    if(isLoading){
        return <div>LOADING {'^_^'}</div>
    }

    if(error){
        return <div>ERROR HAPPEND !!!!!!!!!!</div>
    }

    const filtredProtocols = protocols.filter(({ violatorFullName, violatorPassportNumber,ParkOfficer: {full_name,badge_number}})=>
                violatorFullName.toLowerCase().includes(searchValue.toLowerCase())
        ||
        violatorPassportNumber.toLowerCase().includes(searchValue.toLowerCase())
        ||
        full_name.toLowerCase().includes(searchValue.toLowerCase())
        ||
        badge_number.toLowerCase().includes(searchValue.toLowerCase())
    );

    const protocolWrst = filtredProtocols.map(currentProtocol=>(<Protocol protocol={currentProtocol} key={currentProtocol.id}/>))

    return (
        <section >
            <input type='text'
            value={searchValue}
            onChange={({target:{value}})=>setSearchValue(value)}
            placeholder='Search'
             />
            <div className={style.div}>
                {protocolWrst}
            </div>
        </section>
    );
}

export default ProtocolsPage;
