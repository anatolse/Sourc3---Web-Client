import React from 'react';
import {
  Button, Popup, Section, Window,
} from '@app/shared/components';
import {
  IconDropMenu,
  IconEdit,
  IconProfileLarge, IconProfileLarge2, IconProfileLarge3, IconProfileLarge4, IconRemove,
} from '@app/shared/icons';
import { css } from '@linaria/core';
import { styled } from '@linaria/react';

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
    }
    .btnProfile{
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
  return (
    <Window type="page" title="Manage profiles">
      <ProfileComponent>
        { data && data.map((item) => (
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
            />
            {/* <div className="wrapper" key={item.id}>
              <ul className="wrapperItems">
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
            </div> */}
          </Section>
        ))}
      </ProfileComponent>
      <Button>Add new profile</Button>
    </Window>
  );
}

export default Manage;
