import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

export const SidebarLogo = styled('h1')`
  width: 140px;
  margin: 0 0 20px;
`;

export const SidebarContainer = styled('div')`
  background-color: #1d3557;
  height: 100%;
`;

type ListItemProps = {
  isActive?: boolean;
};

export const SidebarNavListItem = styled('li')<ListItemProps>(({ isActive = false }) => ({
  alignItems: 'center',
  borderRadius: 10,
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '6px 16px',
  marginBottom: '10px',
  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  svg: {
    verticalAlign: 'top',
    color: isActive ? '#457b9d' : 'rgba(255, 255, 255, 0.4)',
  },
  a: {
    width: '100%',
    display: 'block',
    color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.7)',
    padding: '6px 0',
  },
}));

export const SidebarNavWrap = styled('nav')`
  padding: 1rem;
`;

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      border: '1px solid currentColor',
      content: '""',
    },
  },
}));
