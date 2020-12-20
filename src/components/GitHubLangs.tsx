/**
 * @author: lencx
 * @create_at: Dec 20, 2020
 */

import React, { FC, useEffect } from 'react';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  Popper,
  Button,
  InputBase,
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import DoneIcon from '@material-ui/icons/Done';
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
    // inputRoot: {
    //   paddingLeft: 10,
    //   margin: 10,
    //   display: 'flex',
    //   alignItems: 'center',
    //   width: 'calc(100% - 20px)',
    //   boxSizing: 'border-box',
    // },
    inputBase: {
      // width: '100%',
      // borderBottom: '1px solid #dfe2e5',
      width: 'calc(100% - 40px)',
      margin: '10px 20px',
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
    all: {
      fontSize: 14,
      display: 'inline-block',
      width: 22,
    }
  })
);

export interface GitHubLangsProps {
  langs: string[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const fmtAllLang = (option: string) => option === 'all_languages' ? 'All Languages' : option;

const GitHubLangs: FC<GitHubLangsProps> = (props) => {
  const { langs, onChange, defaultValue } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [value, setValue] = React.useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setValue(defaultValue as string);
  }, [defaultValue]);

  const handleClose = (
    event: React.ChangeEvent<{}>,
    reason: AutocompleteCloseReason
  ) => {
    if (reason === 'toggleInput') {
      return;
    }
    anchorEl && anchorEl.focus();
    setAnchorEl(null);
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
        <span className={classes.langbtn}>{fmtAllLang(value) || 'selecting'}</span>
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
          // multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={value}
          onChange={(event, newValue) => {
            const val = newValue as string;
            if (val !== value) {
              setValue(val);
              onChange && onChange(val);
            }
          }}
          // disableCloseOnSelect
          disablePortal
          // renderTags={() => null}
          noOptionsText="No Languages"
          renderOption={(option, { selected }) => (
            <>
              {option !== 'all_languages' ? <span
                className={classes.color}
                style={{ backgroundColor: langColors(option) }}
              /> : <span className={classes.all}>❖</span>}
              <div className={classes.text}>
                {fmtAllLang(option)}
              </div>
              <DoneIcon
                color="primary"
                className={classes.iconSelected}
                style={{ visibility: selected ? 'visible' : 'hidden' }}
              />
            </>
          )}
          options={['all_languages', ...langs]}
          getOptionLabel={fmtAllLang}
          // disabled={}
          renderInput={(params) => {
            return (
              <div>
                <InputBase
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  autoFocus
                  className={classes.inputBase}
                  placeholder="Filter languages"
                />
              </div>
            );
          }}
        />
      </Popper>
    </>
  );
};

GitHubLangs.defaultProps = {
  defaultValue: 'all_languages',
};

export default GitHubLangs;
