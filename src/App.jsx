import "./App.css";
import { useEffect, useState } from "react";
import fetchPhotos from "./components/utils/unsplash-api";
import { IoSearch } from "react-icons/io5";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [imgFullUrl, setimgFullUrl] = useState(null);

  useEffect(() => {
    if (searchValue === null && page === 1) return;

    const fetchPhotosByQuery = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchPhotos(searchValue, page);
        console.log(data);
        if (page === 1) {
          setPhotos(data.results);
        } else {
          setPhotos([...photos, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotosByQuery();
  }, [searchValue, page]);

  const onSearch = (searchQuery) => {
    setSearchValue(searchQuery);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const onCloseModal = () => {
    setisModalOpen(false);
  };

  const onModalOpen = (imgUrl) => {
    setisModalOpen(true);
    setimgFullUrl(imgUrl);
  };
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <main>
        <ImageGallery onModalOpen={onModalOpen} photos={photos} />
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {Array.isArray(photos) && photos.length > 0 && page < totalPages && (
          <LoadMoreBtn onClick={onLoadMore} />
        )}

        <ImageModal
          modalIsOpen={isModalOpen}
          closeModal={onCloseModal}
          imgFullUrl={imgFullUrl}
        />
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
