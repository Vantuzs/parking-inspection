import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAllProtocols } from '../../redux/slices/protocolSlice';
import Protocol from '../../components/Prorocol/Protocol';
import style from './ProtocolsPage.module.scss'

const ProtocolsPage = () => {
    const {protocols,isLoading,error} = useSelector((state)=> state.protocols);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllProtocols());
    },[])

    if(isLoading){
        return <div>LOADING {'^_^'}</div>
    }

    if(error){
        return <div>ERROR HAPPEND !!!!!!!!!!</div>
    }

    const protocolWrst = protocols.map(currentProtocol=>(<Protocol protocol={currentProtocol} key={currentProtocol.id}/>))

    return (
        <section >
            <input type='text'/>
            <div className={style.div}>
                {protocolWrst}
            </div>
        </section>
    );
}

export default ProtocolsPage;
