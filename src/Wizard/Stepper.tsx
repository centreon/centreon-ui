import * as React from 'react';

import { length, lt } from 'ramda';

import {
  DialogTitle,
  Stepper as MUIStepper,
  Step,
  StepLabel,
  makeStyles,
} from '@material-ui/core';

import { Step as StepType } from './models';
import StepIcon from './StepIcon';

interface Props {
  steps: Array<StepType>;
  currentStep: number;
}

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: '18px 16px 14px 16px',
    backgroundColor: theme.palette.grey[200],
  },
  label: {
    '& .MuiStepLabel-alternativeLabel': {
      marginTop: '4px',
      fontSize: '0.8rem',
    },
  },
  dialogTitle: {
    padding: theme.spacing(0),
  },
}));

const Stepper = ({ steps, currentStep }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <DialogTitle className={classes.dialogTitle}>
      {lt(1, length(steps)) && (
        <MUIStepper
          alternativeLabel
          activeStep={currentStep}
          className={classes.stepper}
        >
          {steps.map(({ stepName }) => (
            <Step key={stepName}>
              <StepLabel
                classes={{
                  alternativeLabel: classes.label,
                }}
                StepIconComponent={StepIcon}
              >
                {stepName}
              </StepLabel>
            </Step>
          ))}
        </MUIStepper>
      )}
    </DialogTitle>
  );
};

export default Stepper;