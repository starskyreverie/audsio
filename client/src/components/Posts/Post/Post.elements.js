import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export const GoodLi = styled.li`
  overflow: hidden;
  margin: 0;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.05);
  display: flex;
  align-items: stretch;
  padding: 1em;
  width: 100%;
  justify-content: space-between;
`;

export const BottomDiv = styled.div`
  color: hsla(0, 0%, 100%, 0.48);
  font-size: 12px;
  flex-basis: 100%;
`;

export const CreatorLink = styled(Link)`
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.48);

  &:hover {
    text-decoration: underline;
  }
`;

export const LikeCountContainer = styled.span`
  margin-left: auto;
  font-size: ${({ smallFont }) => (smallFont ? "14px" : "16px")};
`;

export const AudioContainer = styled.span`
  margin-left: auto;
  display: flex;
  color: #d1d2d2;
`;

export const HeartIcon = styled(AiOutlineHeart)`
  margin-left: 4px;
  margin-top: 1px;
  color: #d1d2d2;
  cursor: pointer;
`;

export const FilledHeartIcon = styled(AiFillHeart)`
  margin-left: 4px;
  margin-top: 1px;
  color: #fd4d4d;
  cursor: pointer;
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  vertical-align: center;
  margin-right: 10px;
`;

export const StyledImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;

export const ImageFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  vertical-align: center;
  margin-right: 10px;
`;

export const LikeFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  vertical-align: center;
  width: 20%;
`;

export const TagLabel = styled.label`
  margin-right: 0.5em;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 0.25em 0.5em;
  color: hsla(0, 0%, 100%, 0.48);
  display: block;
  border-radius: 16px;
  background: hsla(0, 0%, 100%, 0.05);
  font-size: 12px;
  z-index: 1000;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const TitleLink = styled.span`
  font-size: ${({ smallFont }) => (smallFont ? "12px" : "16px")};
  font-size: ${({ verySmallFont }) => verySmallFont && "10px"};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
