import React from 'react';
import styles from './Protocol.module.scss'

const Protocol = ({protocol}) => {
    return (
        <article className={styles['card-wrapper']}>
            <h1>Prtocol №{protocol.id}</h1>
            
            <p>Violator: {protocol.violatorFullName}</p>
            <p>Violator passport: {protocol.violatorPassportNumber}</p>
            <p>Service notes: {protocol.serviceNote}</p>
            <h3>Fine amount: {protocol.fineAmount}</h3>
            <p>Created at: {protocol.createdAt}</p>
            <p>Updated at: {protocol.updatedAt}</p>

            <p>Officer: {protocol.ParkOfficer.full_name}</p>
            <p>Officer badge number: {protocol.ParkOfficer.badge_number}</p>

            {protocol.Images.map(currentImage=> (
                <img 
                 key={currentImage.id}
                 src={`http://localhost:5000/images/${currentImage.path}`}
                 alt={protocol.id}
                />
            ))}
        </article>
    );
}

export default Protocol;
