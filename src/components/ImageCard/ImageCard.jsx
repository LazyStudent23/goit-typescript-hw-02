import css from "../ImageCard/ImageCard.module.css";

const ImageCard = ({ onModalOpen, item }) => {
  return (
    <li key={item.id} className={css.listItem}>
      <img
        onClick={() => onModalOpen(item.urls.full)}
        width="150"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={item.urls.regular}
        alt={item.alt_description}
      />
    </li>
  );
};

export default ImageCard;
