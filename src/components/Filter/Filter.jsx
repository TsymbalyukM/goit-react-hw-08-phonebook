import React from 'react';
import { Div, Label, Input } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/FilterSlice';

function Filter() {
  const dispatch = useDispatch();

  const changeFilter = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Div>
      <Label>
        Find contacts by name
        <Input type="text" onChange={changeFilter} />
      </Label>
    </Div>
  );
}

export default Filter;
