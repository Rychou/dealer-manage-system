import React from 'react';
import { Spin, Button } from 'antd';

const Loading = ({ error, retry }) => {
  if (error) {
    console.error(error);

    return (
      <div>
        Error! <Button onClick={retry}>重试</Button>
      </div>
    );
  }
  return <Spin spinning />;
};

export default Loading;
