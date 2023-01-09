import { ReactComponent as Question } from "../icons/question.svg";

const HelpCenter = () => {
  return (
    <button className="help-center">
      <Question style={{ verticalAlign: "middle" }} /> Help
    </button>
  );
};

export default HelpCenter;
