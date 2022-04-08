import { styled } from '@linaria/react';
import { css, cx } from '@linaria/core';
import React, { useEffect } from 'react';

import { checkIsAllowedSeed } from '@app/containers/Auth/store/actions';
import { SEED_PHRASE_COUNT } from '@app/containers/Auth/store/reducer';
import store from '../../../../../index';

interface SeedListProps {
  data: any[];
  errors?: boolean[];
  initial?: string;
  indexByValue?: boolean;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListStyled = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px 0 0;
`;

const baseClassName = css`
  position: relative;
}

  &:before {
    position: absolute;
    top: 10px;
    left: 10px;
    content: attr(data-index);
    width: 24px;
    height: 24px;
    line-height: 23px;
    border: 1px solid rgba(255,255,255);
    border-radius: 50%;
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0, 0.5);
    box-sizing: border-box;
    font-weight: 900;
    background: white;
    z-index: 1;
  }
  &:focus-within:before {
    border: 1px solid black;
    text-align: center;
    font-size: 12px;
    color: black;
    box-sizing: border-box;
    font-weight: 900;

  }

  > input {
    color: black;
    font-size: 16px;
    caret-color: orange;
    position: relative;
    display: inline-block;
    width: 147px;
    height: 44px;
    margin-bottom: 10px;
    padding-left: 46px;
    background-color: rgba(0,0,0, 0.03);
    border: 1px solid rgba(0,0,0, 0.03);
    border-radius: 8px;
    margin-right: -18px;
    font-weight: 600;
    &:focus{
      border-color: rgba(0,0,0);
    }
  }
`;

const errorClassName = css`
>input{
  background: rgba(234, 0, 0, 0.03);
  border: none;
  color: #EA0000;
}

>input:focus-within{
  background: rgba(234, 0, 0, 0.03);
  border: 1px solid #EA0000;
  color: #EA0000;
}

  &:before, &:focus-within:before {
    line-height: 24px;
    border: none;
    background-color: #EA0000;
    color: var(--color-white);
  }
`;

const validClassName = css`
  &:before,&:focus-within:before {
    line-height: 24px;
    border: none;
    background-color: var(--color-black);
    color: var(--color-white);
  }
  >input{
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const refs: HTMLInputElement[] = new Array(SEED_PHRASE_COUNT).fill(null);

const REGEXP_SEED = /(\w+;){12}/;

function fillFromSeed(seed: string, safe: boolean = false): void {
  const array = seed.split(';').slice(0, SEED_PHRASE_COUNT);

  if (!safe) {
    store.dispatch(checkIsAllowedSeed.request(array));
  }

  array.forEach((value, index) => {
    const target = refs[index];

    if (target) {
      target.value = value;
    }
  });
}

const SeedList: React.FC<SeedListProps> = ({
  data, errors, initial, indexByValue, onInput,
}) => {
  useEffect(() => {
    if (initial) {
      fillFromSeed(initial.replace(/\s/g, ';'), true);
    }
  }, [initial]);

  const handleRef = (ref: HTMLInputElement) => {
    if (ref) {
      const { name } = ref;
      const index = parseInt(name, 10);
      refs[index] = ref;
    }
  };

  const handlePaste: React.ClipboardEventHandler = (event) => {
    if (!indexByValue) {
      const seed: string = event.clipboardData.getData('text');
      if (REGEXP_SEED.test(seed)) {
        event.preventDefault();
        fillFromSeed(seed);
      }
    }
  };

  return (
    <ListStyled onPaste={handlePaste}>
      {data.map((value, index) => {
        const idx = indexByValue ? value : index;
        const err = !errors ? value : errors[index];
        const className = cx(baseClassName, err === false && errorClassName, err === true && validClassName);

        return (
          <li key={index} className={className} data-index={idx + 1}>
            <input required autoFocus={index === 0} type="text" name={idx} ref={handleRef} onInput={onInput} />
          </li>
        );
      })}
    </ListStyled>
  );
};

export default SeedList;
