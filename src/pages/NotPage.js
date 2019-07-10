import React from 'react';
import { Link } from 'react-router-dom';

const NotPage = () => (
  <div
    style={{
      textAlign: 'center',
      fontSize: '20px',
      paddingTop: '50px',
    }}
  >
    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
      잘못된 접근입니다. 홈페이지로 이동하세요!
    </Link>
  </div>
);

export default NotPage;
