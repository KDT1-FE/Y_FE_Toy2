import {MdSearch} from 'react-icons/md';
import styled from 'styled-components';
import {theme} from '../../styles/Theme';

interface SearchBarProps {
  height: string;
  content: string;
}

const SearchBar = (props: SearchBarProps) => {
  return (
    <StyledInputContainer>
      <StyledSearchIcon></StyledSearchIcon>
      <StyledSearchBar height={props.height} placeholder={props.content}></StyledSearchBar>
    </StyledInputContainer>
  );
};

export default SearchBar;

const StyledInputContainer = styled.div`
  position: relative;
`;

const StyledSearchIcon = styled(MdSearch)`
  position: absolute;
  width: 24px;
  top: 0;
  bottom: 0;
  margin: auto 8px;

  color: ${theme.colors.gray500};
`;

const StyledSearchBar = styled.input`
  width: 100%;
  height: ${props => props.height + 'px'};
  padding-left: 36px;
  border: 1px solid ${theme.colors.gray500};
  border-radius: 4px;
`;
