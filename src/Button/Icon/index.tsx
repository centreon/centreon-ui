import * as React from 'react';

import {
  makeStyles,
  IconButton,
  IconButtonProps,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(0.25),
  },
}));

type Props = {
  title: string;
  onClick: (event) => void;
  ariaLabel?: string;
} & IconButtonProps;

const ActionButton = ({ title, ariaLabel, ...props }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Tooltip title={title} aria-label={ariaLabel}>
      <span>
        <IconButton className={classes.button} color="primary" {...props} />
      </span>
    </Tooltip>
  );
};

export default ActionButton;
