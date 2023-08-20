import React from 'react';
import { Wrapper, Input, Label } from './Filter.styled';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/Contacts/FilterSlice';

export const Filter = () => {
  const value = useSelector(state => state.filter); 
  const dispatch = useDispatch();

  const onChange = event => {
    const normalizedValue = event.target.value.toLowerCase();

    dispatch(setFilter(normalizedValue));
  };

  return (
    <Wrapper>
      <Label>Find contacts by name</Label>
      <Input type="text" value={value} onChange={onChange} />
    </Wrapper>
  );
};
