import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MessageMainView, Button, Lists } from '../../components';
import { GET_MSG } from '../../reducers/message';

const MessageMainContainer = () => {
  const { token } = useSelector(state => state.user);
  const { messages } = useSelector(state => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch({
        type: GET_MSG,
        data: {
          token,
        },
      });
    }
  }, []);

  return !token ? (
    <MessageMainView>
      <div>
        아직 서비스를 이용할 수 없습니다.
        <p>로그인 하시고 서비스를 이용하세요!</p>
      </div>
      <Link to="/login">
        <Button type="normal" ment="로그인" func={null} />
      </Link>
    </MessageMainView>
  ) : (
    <div>
      <MessageMainView>
        {messages.length > 0 ? (
          messages.map(i => (
            <Lists key={i.id} lists={i} theme="message">
              <Link to={`/messages/info/${i.id}`}>
                <Button type="info" ment="i" func={null} />
              </Link>
            </Lists>
          ))
        ) : (
          <div>
            메세지 데이터가 없습니다.
            <br /> [추가]탭을 눌러 추가해보세요!
          </div>
        )}
        <Link to="/messages/write">
          <Button type="normal" ment="추가" func={null} />
        </Link>
      </MessageMainView>
    </div>
  );
};

export default MessageMainContainer;
