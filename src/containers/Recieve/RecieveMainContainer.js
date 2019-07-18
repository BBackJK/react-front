import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RecieveMainView, Button, Lists } from '../../components';
import { GET_RECIEVE_MESSAGE } from '../../reducers/send';

const RecieveMainContainer = () => {
  const { token } = useSelector(state => state.user);
  const { recieveMessageLists } = useSelector(state => state.send);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_RECIEVE_MESSAGE,
        data: {
          token,
        },
      });
    }
  }, []);

  return !token ? (
    <RecieveMainView>
      <div>
        아직 서비스를 이용할 수 없습니다.
        <p>로그인 하시고 서비스를 이용하세요!</p>
      </div>
      <Link to="/login">
        <Button type="normal" ment="로그인" func={null} />
      </Link>
    </RecieveMainView>
  ) : (
    <div>
      <RecieveMainView>
        {recieveMessageLists.length > 0 ? (
          recieveMessageLists.map(i => (
            <Lists key={i.id} lists={i}>
              <Link to={`/messages/recieve/info/${i.id}`}>
                <Button type="message-info" ment="i" func={null} />
              </Link>
            </Lists>
          ))
        ) : (
          <div>받은 메세지가 없습니다.</div>
        )}
        <Button type="normal" ment="뒤로가기" />
      </RecieveMainView>
    </div>
  );
};

export default RecieveMainContainer;
