import * as React from 'react';

import { equals, length, dec, pipe, inc, filter, isEmpty, not } from 'ramda';
import { Formik } from 'formik';

import { Dialog, makeStyles } from '@material-ui/core';

import { WizardProps } from './models';
import Stepper from './Stepper';
import WizardContent from './WizardContent';
import Confirm from '../Dialog/Confirm';

const useStyles = makeStyles({
  fullHeight: {
    height: '100%',
  },
});

const actionsBarLabelsDefaultValues = {
  labelPrevious: 'Previous',
  labelNext: 'Next',
  labelFinish: 'Finish',
};

const Wizard = ({
  steps,
  onSubmit = undefined,
  initialValues = {},
  width = 'sm',
  fullHeight = false,
  open,
  onClose = undefined,
  confirmDialogLabels = undefined,
  actionsBarLabels = actionsBarLabelsDefaultValues,
}: WizardProps): JSX.Element => {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [sendingRequest, setSendingRequest] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const isLastStep = () => pipe(dec, equals(currentStep))(length(steps));

  const isFirstStep = () => equals(currentStep, 0);

  const goToNextStep = () => {
    if (isLastStep()) {
      return;
    }
    setCurrentStep(inc(currentStep));
  };

  const goToPreviousStep = () => {
    if (isFirstStep()) {
      return;
    }
    setCurrentStep(dec(currentStep));
  };

  const disableNextOnSendingRequests = (sendingRequests) => {
    setSendingRequest(
      pipe(isEmpty, not)(filter(equals(true), sendingRequests)),
    );
  };

  const submit = (values, bag) => {
    if (isLastStep() && onSubmit) {
      onSubmit(values, bag);
      return;
    }

    bag.setSubmitting(false);
  };

  const handleClose = (event, reason) => {
    if (equals(currentStep, 0)) {
      onClose?.('cancel');
      return;
    }
    setOpenConfirm(true);
    onClose?.(reason);
  };

  const handleCloseConfirm = (confirm) => {
    setOpenConfirm(false);

    if (equals(confirm, false)) {
      return;
    }

    onClose?.('cancel');
  };

  const { validate, validationSchema } = steps[currentStep];

  return (
    <>
      <Dialog
        maxWidth={width}
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{
          paper: fullHeight ? classes.fullHeight : undefined,
        }}
      >
        <Stepper steps={steps} currentStep={currentStep} />
        <Formik
          initialValues={initialValues}
          validate={validate}
          validationSchema={validationSchema}
          onSubmit={submit}
          validateOnBlur={false}
          validateOnChange
        >
          <WizardContent
            step={steps[currentStep]}
            sendingRequest={sendingRequest}
            isLastStep={isLastStep}
            isFirstStep={isFirstStep}
            disableNextOnSendingRequests={disableNextOnSendingRequests}
            goToPreviousStep={goToPreviousStep}
            currentStep={currentStep}
            actionsBarLabels={actionsBarLabels}
            goToNextStep={goToNextStep}
          />
        </Formik>
      </Dialog>
      <Confirm
        open={openConfirm}
        onCancel={() => handleCloseConfirm(false)}
        onConfirm={() => handleCloseConfirm(true)}
        {...confirmDialogLabels}
      />
    </>
  );
};

export default Wizard;