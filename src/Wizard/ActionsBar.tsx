import * as React from 'react';

import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

import { ActionsBarProps } from './models';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'sticky',
    bottom: 0,
    padding: '0px 10px',
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const ActionsBar = ({
  isFirstStep,
  goToPreviousStep,
  goToNextStep,
  submit,
  disableActionButtons,
  isLastStep,
  isSubmitting,
  actionsBarLabels,
}: ActionsBarProps): JSX.Element => {
  const classes = useStyles();

  const preventEnterKey = (keyEvent) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  const { labelFinish, labelNext, labelPrevious } = actionsBarLabels;

  const labelNextFinish = isLastStep() ? labelFinish : labelNext;

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.container}
    >
      <Grid item>
        {!isFirstStep() && (
          <Button
            color="primary"
            onClick={goToPreviousStep}
            onKeyPress={preventEnterKey}
            aria-label={labelPrevious}
          >
            <Typography>{labelPrevious}</Typography>
          </Button>
        )}
      </Grid>
      <Grid item>
        <Button
          color="primary"
          onClick={() => (isLastStep() ? submit() : goToNextStep())}
          disabled={disableActionButtons}
          onKeyPress={preventEnterKey}
          aria-label={labelNextFinish}
        >
          <Typography>{labelNextFinish}</Typography>
          {isSubmitting && <CircularProgress size={20} />}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ActionsBar;
