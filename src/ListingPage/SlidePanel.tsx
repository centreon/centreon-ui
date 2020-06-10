import * as React from 'react';

import { equals } from 'ramda';

import { makeStyles, Slide, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  rightPanel: {
    gridArea: '1 / 2',
    zIndex: 3,
  },
  paperPanel: {
    height: '100%',
    display: 'grid',
    gridTemplate: 'auto auto 1fr / 1fr',
  },
});

export interface SlidePanelProps {
  openSlidePanel: boolean;
  slidePanel?: React.ReactElement;
}

const SlidePanel = ({
  openSlidePanel,
  slidePanel,
}: SlidePanelProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide
      direction="left"
      in={equals(openSlidePanel, true)}
      timeout={{
        enter: 150,
        exit: 50,
      }}
    >
      <div className={classes.rightPanel}>
        <Paper elevation={5} className={classes.paperPanel}>
          {slidePanel}
        </Paper>
      </div>
    </Slide>
  );
};

export default SlidePanel;
