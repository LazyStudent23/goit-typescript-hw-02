import "./App.css";
import { useEffect, useState } from "react";
import fetchPhotos from "./components/utils/unsplash-api";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Photo } from "./types/types";
import { AxiosError } from "axios";

const App = () => {
  const [photos, setPhotos] = useState < Photo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [imgFullUrl, setimgFullUrl] = useState<string | null>(null);

  useEffect(() => {
    if (searchValue === null && page === 1) return;

    const fetchPhotosByQuery = async () => {
      if (searchValue === null)
        return;
      try {
        setIsLoading(true);
        const data = await fetchPhotos(searchValue, page);
        console.log(data);
        if (page === 1) {
          setPhotos(data.results);
        } else {
          if (!Array.isArray(photos))
            return;
          setPhotos([...photos, ...data.results]);
        }
        setTotalPages(data.total_pages);
      } catch (error) {
        if (error instanceof AxiosError) 
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotosByQuery();
  }, [searchValue, page]);

  const onSearch = (searchQuery: string) => {
    setSearchValue(searchQuery);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const onCloseModal = () => {
    setisModalOpen(false);
  };

  const onModalOpen = (imgUrl: string) => {
    setisModalOpen(true);
    setimgFullUrl(imgUrl);
  };
  return (
    <div>
      <SearchBar onSearch={onSearch} />
      <main>
        {photos !== null && (
          <ImageGallery onModalOpen={onModalOpen} photos={photos} />
        )}
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {Array.isArray(photos) &&
          photos.length > 0 &&
          totalPages !== null &&
          page < totalPages && <LoadMoreBtn onClick={onLoadMore} />}

        {imgFullUrl !== null && (
          <ImageModal
            modalIsOpen={isModalOpen}
            closeModal={onCloseModal}
            imgFullUrl={imgFullUrl}
          />
        )}
      </main>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
