import { ReactComponent as Go } from "../icons/go.svg";

export const AlgoliaResult = ({ searchTitle, onGo }) => {
  return (
    <>
      <div className="algoliaResult" onClick={onGo}>
        <p>{searchTitle}</p>
        <div className="svg">
          <Go />
        </div>
      </div>
    </>
  );
};
