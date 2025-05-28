import { useDispatch, useSelector } from 'react-redux';
import { helpcenterActions } from '../../store/helpcenterSlice';
import { ReactComponent as HistoryIcon } from '../icons/reload.svg';

const HistoryList = () => {
  const dispatch = useDispatch();
  const { helpResultHistory } = useSelector((state) => state.helpcenter);
  const handleHistory = (index) => {
    dispatch(helpcenterActions.clearViaLinkSearch());
    dispatch(helpcenterActions.setIsFooterVisible(false));
    dispatch(
      helpcenterActions.updateResultContent(helpResultHistory[index])
    );
  };

  return [...helpResultHistory].reverse().map((history, index) => (
    <div className="HistoryList">
      <HistoryIcon />
      <div key={index} onClick={() => handleHistory(index)}>
        {history.searchInput}
      </div>
    </div>
  ));
};

export default HistoryList;
