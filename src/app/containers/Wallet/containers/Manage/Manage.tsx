import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Section, Window,
} from '@app/shared/components';
import {
  IconDropMenu,
  IconEdit,
  IconProfileLarge, IconProfileLarge2, IconProfileLarge3, IconProfileLarge4, IconRemove,
} from '@app/shared/icons';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import useOutsideClick from '@app/shared/hooks/OutsideClickHook';

const ProfileComponent = styled.div`
display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    &>div:nth-child(odd){
        margin: 8px 7px 0 8px;
    }
    &>div:nth-child(even){
        margin: 8px 8px 0 4px; 
    }
    margin-bottom: 16px;

    .wrapper{
      position: absolute;
      top: 8px;
      right: 8px;
      width: 172px;
      height: 80px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.05);
      box-sizing: border-box;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      overflow:
    }
    .wrapperItems{
      height: 100%;
        &>li:nth-child(even)>.btnProfile:hover, .btnProfile:active{
          border-bottom-left-radius:8px;
          border-bottom-right-radius:8px;
        }
        &>li:nth-child(odd)>.btnProfile:hover, .btnProfile:active{
          border-top-left-radius:8px;
          border-top-right-radius:8px;
        }
    }
    .btnProfile:{
        font-size: 16px;
        line-height: 16px;
        font-weight: 500;
        padding: 2px  16px;
        margin: 0;
    }
`;
const Profile = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
margin: 16px 0;
`;
const Name = styled.p`
margin: 0
font-weight: 600;
font-size: 16px;
line-height: 16px;
margin: 16px 10px 16px;
text-align: right;
letter-spacing: 0.1px;
`;

const style = css`
  position: absolute;
  top: 8px;
  right: 0;
`;

const data = [
  {
    id: 1,
    avatar: IconProfileLarge,
    name: 'Long John Silver',
    active: true,
  },
  {
    id: 2,
    avatar: IconProfileLarge2,
    name: 'Mister X',
    active: false,
  },
  {
    id: 3,
    avatar: IconProfileLarge3,
    name: 'John Doe',
    active: false,
  },
  {
    id: 4,
    avatar: IconProfileLarge4,
    name: 'Master Splinter',
    active: false,
  },
];

function Manage() {
  const ContainerProfile = ({ item }) => {
    const wrapperRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const { isOutside } = useOutsideClick(wrapperRef);
    useEffect(() => {
      if (isOutside) {
        setVisible(false);
      }
    }, [isOutside]);

    return (
      <>
        <Section variant="profile" key={item.id}>
          <Profile>
            <Button variant="icon" icon={item.avatar} />
            <Name>{item.name}</Name>
            <Button
              pallete={item.active ? 'currentRole' : 'orange'}
              variant="switch"
            >
              {item.active ? ('Current role') : ('Switch')}

            </Button>
          </Profile>
          <Button
            className={style}
            variant="icon"
            icon={IconDropMenu}
            onClick={() => (setVisible(true))}
            aria-hidden="true"
          />
          {visible && (
          <div className="wrapper" key={item.id} ref={wrapperRef}>
            <ul className="wrapperItems" aria-hidden="true">
              <li>
                <Button
                  className="btnProfile"
                  variant="linkDrop"
                  pallete="black"
                  icon={IconEdit}
                >
                  Edit profile
                </Button>

              </li>
              <li>
                <Button
                  className="btnProfile"
                  variant="linkDrop"
                  pallete="black"
                  icon={IconRemove}
                >
                  Remove profile
                </Button>

              </li>
            </ul>
          </div>
          )}
        </Section>
      </>
    );
  };
  return (
    <Window type="page" title="Manage profiles">
      <ProfileComponent>
        { data && data.map((item) => (
          <ContainerProfile item={item} key={item.id} />
        ))}
      </ProfileComponent>
      <Button>Add new profile</Button>
    </Window>
  );
}

export default Manage;
