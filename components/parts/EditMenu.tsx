import { FC } from "react";
import { StyledMenu } from "components/parts/styled-menu";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { MoreVert as MoreVertIcon, Edit as EditIcon, ReportProblem as ReportProblemIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAppSelector } from "store/hooks";

interface EditMenuProps {
  anchorEl: HTMLElement | null;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  handleClose: () => void;
  onEditContent: () => void;
  onDeleteContent: () => void;
  userUid: string;
}

const EditMenu: FC<EditMenuProps> = ({ 
  anchorEl, handleClick, handleClose, onEditContent, onDeleteContent, userUid
}) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const open = Boolean(anchorEl);

  return (
    <Grid item>
      <IconButton aria-label="more button" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        { myInfo && myInfo.uid === userUid ? (
          <div>
            <MenuItem onClick={onEditContent} disableRipple>
              <EditIcon />
              Edit
            </MenuItem>
            <MenuItem onClick={onDeleteContent} disableRipple>
              <DeleteIcon />
              Delete
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose} disableRipple>
              <ReportProblemIcon />
              Report Problem
            </MenuItem>
          </div>
        )}
      </StyledMenu>
    </Grid>
  )
}

export default EditMenu