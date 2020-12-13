/**
 * @author: lencx
 * @create_at: Dec 13, 2020
 */

import React, { FC } from 'react';
import { Card, CardContent, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined';
import GridIcon from '@material-ui/icons/GridOnOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';

import SplitButton from 'components/SplitButton';
import GitHubLangs from 'components/GitHubLangs';
import { useGhState, useGhDispatch, ghColors } from 'github';
import { langColors } from 'utils/tools';

import './index.scss';

const useStyles = makeStyles(() =>
  createStyles({
    head: {
      marginBottom: 20,
    },
    color: {
      display: 'inline-block',
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 5,
      border: 'solid 2px rgba(27, 31, 35, 0.3)',
      boxSizing: 'border-box',
      verticalAlign: -2,
    },
    name: {
      fontSize: 12,
    },
    selectLang: {
      padding: '0 5px',
    },
    input: {
      fontSize: '0.8rem',
    },
  })
);

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  // const dispatch = useGhDispatch();
  // const ghState = useGhState();

  const [selectLang, setSelectLang] = React.useState<string>('');

  const handleSelectLang = (e: object, val: any) => {
    setSelectLang(val as string);
  };

  return (
    <Card className={classes.head}>
      <CardContent>
        <GitHubLangs langs={Object.keys(ghColors) as string[]} />
        {/* <Autocomplete
          id="select-lang"
          autoHighlight
          clearOnBlur
          className="selectRoot"
          style={{ width: 200 }}
          options={Object.keys(ghColors) as string[]}
          classes={{ option: classes.selectLang }}
          getOptionLabel={(option) => option}
          onChange={handleSelectLang}
          value={selectLang}
          renderOption={(option) => (
            <>
              <span
                className={classes.color}
                style={{ background: langColors(option) }}
              />
              <span className={classes.name}>{option}</span>
            </>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose Languages"
              margin="normal"
              InputProps={{ ...params.InputProps, className: classes.input }}
              // variant="outlined"
            />
          )}
        /> */}

        <SplitButton
          className="ghfbtn"
          extra={<DateRangeIcon />}
          options={[
            { label: 'Yearly', value: 'yearly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Daily', value: 'daily' },
          ]}
        />
        <SplitButton
          className="ghfbtn"
          options={[
            {
              label: (
                <>
                  <GridIcon /> Grid
                </>
              ),
              value: 'grid',
            },
            {
              label: (
                <>
                  <ListIcon /> List
                </>
              ),
              value: 'list',
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default Header;
