interface LoadMoreBtnProps {
  onClick: () => void
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return (
    <button type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
