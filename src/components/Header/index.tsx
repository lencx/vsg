/**
 * @author: lencx
 * @create_at: Dec 13, 2020
 */

import React, { memo, FC, useEffect } from 'react';
import { Avatar, Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRangeOutlined';
import GridIcon from '@material-ui/icons/GridOnOutlined';
import ListIcon from '@material-ui/icons/ListAltOutlined';

import SplitButton from 'components/SplitButton';
import GitHubLangs from 'components/GitHubLangs';
import { useGhState, useGhDispatch, ghColors, useTrending } from 'github';
import LogoIcon from 'assets/logo.png';

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

const layoutType = [
  { label: <><GridIcon fontSize="small" /> Grid</>, value: 'grid' },
  { label: <><ListIcon fontSize="small" /> List</>, value: 'list' },
];

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  const dispatch = useGhDispatch();
  const ghState: any = useGhState();
  const [fetch] = useTrending();

  useEffect(() => {
    fetch({});
  }, []);

  // const [selectLang, setSelectLang] = React.useState<string>('');

  // const handleSelectLang = (e: object, val: any) => {
  //   setSelectLang(val as string);
  // };

  const handleSearch = (e: string) => {
    console.log('«78» /components/Header/index.tsx ~> ', e);
    // fetch();
  };

  const handleSelect = (key: string, val: string) => {
    dispatch({ type: 'config', payload: { [key]: val } });
    if (key !== 'layout') {
      // handleSearch();
    }
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
            <Avatar alt="logo" variant="square" src={LogoIcon} />
          </Grid>
          <Grid item>
            <Grid item container spacing={1}>
              <Grid item>
                <GitHubLangs
                  langs={Object.keys(ghColors) as string[]}
                  onChange={(e) => handleSelect('lang', e)}
                />
              </Grid>
              <Grid item>
                <SplitButton
                  className="ghfbtn"
                  extra={<DateRangeIcon fontSize="small" />}
                  onChange={(e) => handleSelect('range', e)}
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
                  onChange={(e) => handleSelect('layout', e)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(Header);
