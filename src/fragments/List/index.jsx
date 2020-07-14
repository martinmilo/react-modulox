import React from 'react';
import Fragment from '../Base';
import styled from 'styled-components';

const List = ({ data, children, ...props }) => {
  if (!data || !children || children.constructor !== Function) {
    return <Fragment {...props} />;
  }

  const dataList = data.constructor === Array ? data : Object.keys(data);

  return <Fragment {...props}>{dataList.map(children)}</Fragment>;
};

export default List;
