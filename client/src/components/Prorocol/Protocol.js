import React from "react";
import styles from "./Protocol.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Protocol = ({ protocol }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  return (
    <article className={styles["card-wrapper"]}>
      <h1>Prtocol №{protocol.id}</h1>

      <p>Violator: {protocol.violatorFullName}</p>
      <p>Violator passport: {protocol.violatorPassportNumber}</p>
      <p>Service notes: {protocol.serviceNotes}</p>
      <h3>Fine amount: {protocol.fineAmount}</h3>
      <p>Created at: {protocol.createdAt}</p>
      <p>Updated at: {protocol.updatedAt}</p>

      <p>Officer: {protocol.ParkOfficer.full_name}</p>
      <p>Officer badge number: {protocol.ParkOfficer.badge_number}</p>
        
        {protocol.Images.length >1 ?
        <Slider {...settings} className={styles.slider} >
      {protocol.Images.map((currentImage) => (
          <img
          key={currentImage.id}
          src={`http://localhost:5000/images/${currentImage.path}`}
          alt={protocol.id}
          />
        ))}
        </Slider>:protocol.Images.map((currentImage) => (
          <img
          key={currentImage.id}
          src={`http://localhost:5000/images/${currentImage.path}`}
          alt={protocol.id}
          />
        ))}
    </article>
  );
};

export default Protocol;
