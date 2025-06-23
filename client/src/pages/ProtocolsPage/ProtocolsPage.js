import React, { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllProtocols,getAllProtocolsById } from '../../redux/slices/protocolSlice';
import Protocol from '../../components/Prorocol/Protocol';
import {useParams} from 'react-router-dom'
import style from './ProtocolsPage.module.scss'


const ProtocolsPage = () => {
    const {parkOfficerId,parkOfficerFullName} = useParams()
    const {protocols,isLoading,error} = useSelector((state)=> state.protocols);
    const dispatch = useDispatch();
    const [searchValue,setSearchValue] = useState('');

    useEffect(()=>{
        if(parkOfficerId){
            dispatch(getAllProtocolsById(parkOfficerId));
        } else {
            dispatch(getAllProtocols());
        }
    },[])

    if(isLoading){
        return <div>LOADING {'^_^'}</div>
    }

    if(error){
        return <div>ERROR HAPPEND !!!!!!!!!!</div>
    }

    const filterProtocols = (protocols,query) =>{
        const lowerCaseQuery = query.toLowerCase().trim()

        const operator = ['>','<','='].find(op=>
            lowerCaseQuery.startsWith(op)
        );

        const amount = parseFloat(lowerCaseQuery.slice(1).trim())

        return protocols.filter((protocol)=>{
            const fineAmount = protocol.fineAmount

            if(operator){
                switch(operator) {
                    case '>': return fineAmount > amount;
                    case '<': return fineAmount < amount;
                    case '=': return fineAmount === amount;
                    default: return false
                }
            }
            return (protocol.violatorFullName.toLowerCase().includes(query.toLowerCase())
        ||
        protocol.violatorPassportNumber.toLowerCase().includes(query.toLowerCase())
        ||
        protocol.ParkOfficer.full_name.toLowerCase().includes(query.toLowerCase())
        ||
        protocol.ParkOfficer.badge_number.toLowerCase().includes(query.toLowerCase()))
        })
    }

    // const filtredProtocols = protocols.filter(({ violatorFullName, violatorPassportNumber,ParkOfficer: {full_name,badge_number}})=>);

    const protocolWrst = filterProtocols(protocols,searchValue).map(currentProtocol=>(<Protocol protocol={currentProtocol} key={currentProtocol.id}/>))

    return (
        <section >
            <input type='text'
            value={searchValue}
            onChange={({target:{value}})=>setSearchValue(value)}
            placeholder='Search'
             />
             <p>{parkOfficerFullName? `${parkOfficerFullName}|Protocols`:'All Protocols'}</p>
            <div className={style.div}>
                {protocolWrst}
            </div>
        </section>
    );
}

export default ProtocolsPage;
