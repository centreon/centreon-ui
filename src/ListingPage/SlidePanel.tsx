import * as React from 'react';

import { isEmpty } from 'ramda';

import {
  makeStyles,
  Paper,
  Slide,
  Divider,
  AppBar,
  Tabs,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplate: 'auto auto 1fr / 1fr',
  },
  header: {
    gridArea: '1 / 1 / 2 / 1',
    padding: theme.spacing(2),
  },
  divider: {
    gridArea: '2 / 1 / 3 / 1',
  },
  body: {
    gridArea: '3 / 1 / 4 / 1',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    height: '100%',
  },
  contentContainer: {
    backgroundColor: theme.palette.background.default,
    position: 'relative',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    overflow: 'auto',
    padding: theme.spacing(1),
  },
}));

export interface Tab {
  tab: JSX.Element;
  id: number;
}

interface SlidePanelProps {
  header: React.ReactElement;
  selectedTab: React.ReactElement;
  tabs?: Array<JSX.Element>;
  selectedTabId?: number;
  onTabSelect?: (event, id: number) => void;
}

const SlidePanel = ({
  header,
  tabs = [],
  selectedTabId = 0,
  selectedTab,
  onTabSelect = () => undefined,
}: SlidePanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide
      direction="left"
      in
      timeout={{
        enter: 150,
        exit: 50,
      }}
    >
      <Paper elevation={2} className={classes.container}>
        {header && (
          <>
            <div className={classes.header}>{header}</div>
            <Divider className={classes.divider} />
          </>
        )}
        <div className={classes.body}>
          <AppBar position="static" color="default">
            {!isEmpty(tabs) && (
              <Tabs
                variant="fullWidth"
                value={selectedTabId}
                indicatorColor="primary"
                textColor="primary"
                onChange={onTabSelect}
              >
                {tabs.map((tab) => tab)}
              </Tabs>
            )}
          </AppBar>
          <div className={classes.contentContainer}>
            <div className={classes.content}>{selectedTab}</div>
          </div>
        </div>
      </Paper>
    </Slide>
  );
};

export default SlidePanel;
