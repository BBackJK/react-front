import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReceiveMainView, Button, Lists } from '../../components';
import { GET_RECEIVE_MESSAGE } from '../../reducers/send';

const ReceiveMainContainer = () => {
  const { token } = useSelector(state => state.user);
  const { receiveMessageLists } = useSelector(state => state.send);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_RECEIVE_MESSAGE,
        data: {
          token,
        },
      });
    }
  }, []);

  return !token ? (
    <ReceiveMainView>
      <div>
        아직 서비스를 이용할 수 없습니다.
        <p>로그인 하시고 서비스를 이용하세요!</p>
      </div>
      <Link to="/login">
        <Button type="normal" ment="로그인" func={null} />
      </Link>
    </ReceiveMainView>
  ) : (
    <div>
      <ReceiveMainView>
        {receiveMessageLists.length > 0 ? (
          receiveMessageLists.map(i => (
            <Lists key={i.id} lists={i}>
              <Link to={`/messages/receive/info/${i.id}`}>
                <Button type="message-info" ment="i" func={null} />
              </Link>
            </Lists>
          ))
        ) : (
          <div>받은 메세지가 없습니다.</div>
        )}
        <Button type="normal" ment="뒤로가기" />
      </ReceiveMainView>
    </div>
  );
};

export default ReceiveMainContainer;
