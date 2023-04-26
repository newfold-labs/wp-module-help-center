import { ReactComponent as Go } from "../icons/go.svg";

export const AlgoliaResult = ({ searchTitle, onGo }) => {
  return (
    <>
      <div className="algoliaResult">
        <p>{searchTitle}</p>
        <button
          onClick={() => {
            onGo();
          }}
        >
          <Go />
        </button>
      </div>
    </>
  );
};
