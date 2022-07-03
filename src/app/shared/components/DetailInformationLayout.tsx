import { styled } from '@linaria/react';
// import { PALLETE_ASSETS } from '@app/shared/constants';
import { AssetIconProps } from '@app/shared/components/AssetIcon';

export const InformationItem = styled.div<AssetIconProps>`
  margin-bottom: 16px;
  .title {
    font-weight: 800;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1px;
    color: #000;
  }
  .value {
    display: flex;
    margin: 10px 0 0;
    font-weight: 800;
    font-size: 16px;
    line-height: 20px;
    align-items: center;
    word-break: break-word;
    color: rgba(0, 0, 0, 0.5);

    .asset-label {
      align-items: center;
      .iconClass {
        position: relative;
      }
      .asset-name {
        color: rgba(0, 0, 0, 0.5);
        font-weight: 800;
        font-size: 18px;
        line-height: 22px;
      }
    }

    &.asset {
      display: block;
      .amount-comment {
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.5);
        // margin-left: 36px;
      }
      &.mlt-asset {
        display: flex;
        margin-top: -5px;
        .multi-asset {
          margin-left: 0;
        }

        .multi-asset-title {
          padding-top: 20px;
          font-weight: 600;
          font-size: 16px;
          &::after {
            content: '';
            padding: 0;
          }
        }
      }
    }

    > p {
      width: 90%;
      margin: 0;
      display: inline-block;
    }

    > span {
      margin-right: 6px;
      &::after {
        padding: 0 12px;
      }

      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
`;
