/**
 * @author: lencx
 * @create_at: Dec 13, 2020
 */

import React, { FC } from 'react';
import {
  useTheme,
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  Popper,
  Paper,
  Button,
  InputBase,
  Divider,
  Chip,
} from '@material-ui/core';
// import SettingsIcon from '@material-ui/icons/Settings';
import FilterListIcon from '@material-ui/icons/FilterList';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';
// import AddBoxIcon from '@material-ui/icons/AddBox';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete, {
  AutocompleteCloseReason,
} from '@material-ui/lab/Autocomplete';

import { langColors } from 'utils/tools';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    langbtn: {
      marginLeft: 5,
      textTransform: 'none',
    },
    popper: {
      border: '1px solid rgba(27,31,35,.15)',
      boxShadow: '0 3px 12px rgba(27,31,35,.15)',
      borderRadius: 3,
      width: 300,
      zIndex: 1,
      fontSize: 13,
      color: '#586069',
      backgroundColor: '#f6f8fa',
    },
    header: {
      borderBottom: '1px solid #e1e4e8',
      padding: '8px 10px',
      fontWeight: 600,
    },
    inputRoot: {
      paddingLeft: 10,
      margin: 10,
      display: 'flex',
      alignItems: 'center',
      width: 'calc(100% - 20px)',
      boxSizing: 'border-box',
    },
    inputBase: {
      width: '100%',
      // borderBottom: '1px solid #dfe2e5',
      '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: '1px solid #ced4da',
        fontSize: 14,
        '&:focus': {
          boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    paper: {
      boxShadow: 'none',
      margin: 0,
      color: '#586069',
      fontSize: 13,
    },
    option: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      '&[data-focus="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    popperDisablePortal: {
      position: 'relative',
      width: '100% !important',
    },
    iconSelected: {
      width: 17,
      height: 17,
      marginRight: 5,
      marginLeft: -2,
    },
    color: {
      width: 14,
      height: 14,
      flexShrink: 0,
      borderRadius: 7,
      marginRight: 8,
      marginTop: 2,
      boxSizing: 'border-box',
      border: 'solid 2px rgba(27, 31, 35, 0.1)',
    },
    text: {
      flexGrow: 1,
    },
    close: {
      opacity: 0.6,
      width: 18,
      height: 18,
    },
    searchIco: {
      padding: 10,
    },
    tag: {
      height: 24,
      border: 'solid 2px rgba(27, 31, 35, 0.1)',
      background: '#fff',
      // display: 'flex',
      // justifyContent: 'center',
      // flexWrap: 'wrap',
      margin: '0 2px 2px 0',
      '& > *': {
        fontSize: '0.7rem',
        paddingLeft: 8,
        // color: '#fff',
        // margin: theme.spacing(0.5),
      },
      '& .MuiChip-label': {
        paddingRight: 0,
      },
      '& .MuiSvgIcon-root.MuiChip-deleteIcon': {
        marginRight: 0,
      },
    },
  })
);

export interface GitHubLangsProps {
  langs: string[];
}

const GitHubLangs: FC<GitHubLangsProps> = (props) => {
  const { langs } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<string[]>([]);
  // const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearch = () => {
    // console.log('«208» /components/GitHubLangs/index.tsx ~> ', value);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === 'toggleInput') {
      return;
    }
    handleSearch();
    // setValue(pendingValue);
    // if (anchorEl) {
    //   anchorEl.focus();
    // }
    // setAnchorEl(null);
  };

  const handleRemove = (val: string) => {
    const result = value.filter((i) => i !== val);
    setValue(result);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'github-languages' : undefined;

  return (
    <>
      <Button
        disableRipple
        aria-describedby={id}
        onClick={handleClick}
        variant="contained"
        size="small"
        color="primary">
        <FilterListIcon fontSize="small" />
        <span className={classes.langbtn}>Languages</span>
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={classes.popper}>
        <div className={classes.header}>Search Languages</div>
        <Autocomplete
          open
          onClose={handleClose}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText="No Languages"
          renderOption={(option, { selected }) => (
            <>
              <DoneIcon
                className={classes.iconSelected}
                style={{ visibility: selected ? 'visible' : 'hidden' }}
              />
              <span
                className={classes.color}
                style={{ backgroundColor: langColors(option) }}
              />
              <div className={classes.text}>{option}</div>
              <CloseIcon
                className={classes.close}
                style={{ visibility: selected ? 'visible' : 'hidden' }}
              />
            </>
          )}
          options={[...langs].sort((a, b) => {
            // Display the selected langs first.
            let ai = value.indexOf(a);
            ai = ai === -1 ? value.length + langs.indexOf(a) : ai;
            let bi = value.indexOf(b);
            bi = bi === -1 ? value.length + langs.indexOf(b) : bi;
            return ai - bi;
          })}
          getOptionLabel={(option) => option}
          renderInput={(params) => {
            return (
              <div>
                <Paper className={classes.inputRoot}>
                  <InputBase
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    autoFocus
                    className={classes.inputBase}
                    placeholder="Filter languages"
                  />
                  {/* <IconButton size="small" className={classes.searchIco} aria-label="add">
                    <AddBoxIcon />
                  </IconButton> */}
                  <IconButton className={classes.searchIco} aria-label="search">
                    <SearchIcon onClick={handleSearch} />
                  </IconButton>
                </Paper>
                <div style={{ margin: 10 }}>
                  {value.map((lang) => (
                    <Chip
                      key={lang}
                      label={lang}
                      style={{
                        borderColor:
                          langColors(lang) === '#fff'
                            ? '#d2d2d2'
                            : langColors(lang),
                      }}
                      className={classes.tag}
                      // deleteIcon={<DoneIcon />}
                      onDelete={() => handleRemove(lang)}
                    />
                    // <span
                    //   key={lang}
                    //   className={classes.tag}
                    //   style={{
                    //     backgroundColor: langColors(lang),
                    //     color: theme.palette.getContrastText(langColors(lang)),
                    //   }}
                    // >
                    //   {lang}
                    // </span>
                  ))}
                </div>
                <Divider />
              </div>
            );
          }}
        />
      </Popper>
    </>
  );
};

export default GitHubLangs;
