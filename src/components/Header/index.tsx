/**
 * @author: lencx
 * @create_at: Dec 13, 2020
 */

import React, { FC, useEffect } from 'react';
import { Avatar, Card, CardContent, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined';
import GridIcon from '@material-ui/icons/GridOnOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';

import SplitButton from 'components/SplitButton';
import GitHubLangs from 'components/GitHubLangs';
import { useGhState, useGhDispatch, ghColors, useTrending } from 'github';
import { langColors } from 'utils/tools';
import LogoIcon from './vsgh-logo.png';

import './index.scss';

const useStyles = makeStyles(() =>
  createStyles({
    head: {
      marginBottom: 20,
    },
    logo: {
      // display: 'in'
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

const layoutType = [
  { label: <><GridIcon fontSize="small" /> Grid</>, value: 'grid' },
  { label: <><ListIcon fontSize="small" /> List</>, value: 'list' },
];

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  // const dispatch = useGhDispatch();
  // const ghState = useGhState();
  const [fetch] = useTrending();

  useEffect(() => {
    fetch({});
  }, []);

  const [selectLang, setSelectLang] = React.useState<string>('');

  const handleSelectLang = (e: object, val: any) => {
    setSelectLang(val as string);
  };

  return (
    <Card className={classes.head}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Avatar className={classes.logo} alt="logo" variant="square" src={LogoIcon} />
          </Grid>
          <Grid item>
            <Grid item container spacing={1}>
              <Grid item>
                <GitHubLangs langs={Object.keys(ghColors) as string[]} />
              </Grid>
              <Grid item>
                <SplitButton
                  className="ghfbtn"
                  extra={<DateRangeIcon fontSize="small" />}
                  options={[
                    { label: 'Yearly', value: 'yearly' },
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Daily', value: 'daily' },
                  ]}
                />
              </Grid>
              <Grid item>
                <SplitButton
                  className="ghfbtn"
                  options={layoutType}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
      </CardContent>
    </Card>
  );
};

export default Header;
