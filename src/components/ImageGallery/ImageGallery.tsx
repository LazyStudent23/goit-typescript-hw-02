import { Photo } from "../../types/types";
import ImageCard from "../ImageCard/ImageCard";
import css from "../ImageGallery/ImageGallery.module.css";

interface ImageGalleryProps {
  onModalOpen: (param: string) => void,
  photos: Photo[]
}

const ImageGallery = ({ onModalOpen, photos }: ImageGalleryProps) => {
  return (
    <ul
      className={css.galleryList}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      }}
    >
      {Array.isArray(photos) &&
        photos.map((item) => {
          return (
            <ImageCard onModalOpen={onModalOpen} item={item} key={item.id} />
          );
        })}
    </ul>
  );
};

export default ImageGallery;
