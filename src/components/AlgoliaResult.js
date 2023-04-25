export const AlgoliaResult = ({ searchTitle }) => {
  return (
    <>
      <div className="algoliaResult">
        <p>{searchTitle}</p>
        <button>Ask</button>
      </div>
    </>
  );
};
