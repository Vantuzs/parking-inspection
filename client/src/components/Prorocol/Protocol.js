import React, { useState } from "react";
import styles from "./Protocol.module.scss";
import Slider from "react-slick";
import {
  getAllProtocols,
  deleteProtocolById,
  updateProtocolById,
  deletePorotocolImageById,
} from "../../redux/slices/protocolSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpdateProtocolById from "../Modals/UpdateProtocolById";
import AddImage from "../Modals/AddImage";

const Protocol = ({ protocol, refreshProtocolsList }) => {
  const dispatch = useDispatch();
  const { parkOfficerId, parkOfficerFullName } = useParams();
  const [deleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addImagesModalOpen, setAddImagesModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    afterChange: (currentImageIndex) => {
      setCurrentSlide(currentImageIndex);
    },
  };

  const deleteHandler = async () => {
    await dispatch(
      deleteProtocolById({
        parkOfficerId: protocol.officerId,
        protocolId: protocol.id,
      })
    );
    await dispatch(getAllProtocols());
  };

  const deleteImageHandler = async () => {
    await dispatch(
      deletePorotocolImageById({
        protocolId: protocol.id,
        imageId: protocol.Images[currentSlide].id,
      })
    );
    await refreshProtocolsList();
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

      <button onClick={() => deleteHandler()}>Delete</button>
      {parkOfficerId && (
        <button onClick={() => setEditModalOpen(true)}>Edit</button>
      )}
      {editModalOpen && (
        <UpdateProtocolById
          open={editModalOpen}
          setIsOpen={setEditModalOpen}
          protocol={protocol}
          refreshProtocolsList={refreshProtocolsList}
        />
      )}

      <button onClick={() => setAddImagesModalOpen(true)}>Add images</button>
      {addImagesModalOpen && (
        <AddImage
          open={addImagesModalOpen}
          setIsOpen={setAddImagesModalOpen}
          protocolId={protocol.id}
          refreshProtocolsList={refreshProtocolsList}
        />
      )}

      {protocol.Images.length > 1 ? (
        <Slider {...settings} className={styles.slider}>
          {protocol.Images.map((currentImage) => (
            <img
              key={currentImage.id}
              src={`http://localhost:5000/images/${currentImage.path}`}
              alt={protocol.id}
            />
          ))}
        </Slider>
      ) : (
        protocol.Images.map((currentImage) => (
          <img
            key={currentImage.id}
            src={`http://localhost:5000/images/${currentImage.path}`}
            alt={protocol.id}
          />
        ))
      )}

      {protocol.Images.length > 0 && <button onClick={deleteImageHandler}>Delete current image in the slider</button>}
    </article>
  );
};

export default Protocol;
