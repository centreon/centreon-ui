import * as React from 'react';

import { equals } from 'ramda';
import clsx from 'clsx';

import {
  makeStyles,
  withStyles,
  TableCell,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { Column, ColumnType, ComponentColumnProps } from './models';

const BodyTableCell = withStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingLeft: (listingCheckable: boolean): number =>
      theme.spacing(listingCheckable ? 0 : 1.5),
  },
  truncated: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 150,
    whiteSpace: 'nowrap',
  },
}));

interface Props {
  row;
  column: Column;
  listingCheckable: boolean;
  isRowSelected: boolean;
  isRowHovered: boolean;
}

const ColumnCell = ({
  row,
  column,
  listingCheckable,
  isRowSelected,
  isRowHovered,
}: Props): JSX.Element | null => {
  const classes = useStyles(listingCheckable);

  const cellByColumnType = {
    [ColumnType.string]: (): JSX.Element => {
      const {
        getFormattedString,
        width,
        getTruncateCondition,
        getColSpan,
      } = column;

      const isTruncated = getTruncateCondition?.(isRowSelected);
      const colSpan = getColSpan?.(isRowSelected);

      const formattedString = getFormattedString?.(row) || '';

      return (
        <BodyTableCell
          align="left"
          style={{ width: width || 'auto' }}
          className={classes.cell}
          colSpan={colSpan}
        >
          {isTruncated && (
            <Tooltip title={formattedString}>
              <Typography
                variant="body2"
                className={clsx({ [classes.truncated]: isTruncated })}
              >
                {formattedString}
              </Typography>
            </Tooltip>
          )}
          {!isTruncated && formattedString}
        </BodyTableCell>
      );
    },
    [ColumnType.component]: (): JSX.Element | null => {
      const { getHiddenCondition, width, clickable } = column;
      const Component = column.Component as (
        props: ComponentColumnProps,
      ) => JSX.Element;

      const isCellHidden = getHiddenCondition?.(isRowSelected);

      if (isCellHidden) {
        return null;
      }

      return (
        <BodyTableCell
          align="left"
          style={{ width: width || 'auto' }}
          onClick={(e): void => {
            if (!clickable) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
          }}
          className={classes.cell}
        >
          <Component
            row={row}
            isSelected={isRowSelected}
            isHovered={isRowHovered}
          />
        </BodyTableCell>
      );
    },
  };

  return cellByColumnType[column.type]();
};

const MemoizedColumnCell = React.memo<Props>(
  ColumnCell,
  (prevProps, nextProps) => {
    const previousColumn = prevProps.column;
    const previousRow = prevProps.row;
    const previousIsRowHovered = prevProps.isRowHovered;
    const previousIsRowSelected = prevProps.isRowSelected;
    const previousHasHoverableComponent = previousColumn.hasHoverableComponent;
    const previousRenderComponentOnRowUpdate =
      previousColumn.renderComponentOnRowUpdate;

    const nextColumn = nextProps.column;
    const nextRow = nextProps.row;
    const nextIsRowHovered = nextProps.isRowHovered;
    const nextIsRowSelected = nextProps.isRowSelected;
    const nextHasHoverableComponent = nextColumn.hasHoverableComponent;
    const nextRenderComponentOnRowUpdate =
      nextColumn.renderComponentOnRowUpdate;

    const previousIsComponentHovered =
      previousHasHoverableComponent && previousIsRowHovered;
    const nextIsComponentHovered =
      nextHasHoverableComponent && nextIsRowHovered;

    const previousFormattedString = previousColumn.getFormattedString?.(
      previousRow,
    );
    const nextFormatttedString = nextColumn.getFormattedString?.(nextRow);

    const previousColSpan = previousColumn.getColSpan?.(previousIsRowSelected);
    const nextColSpan = nextColumn.getColSpan?.(nextIsRowSelected);

    const previousTruncateCondition = previousColumn.getTruncateCondition?.(
      previousIsRowSelected,
    );
    const nextTruncateCondition = nextColumn.getTruncateCondition?.(
      nextIsRowSelected,
    );

    const previousHiddenCondition = previousColumn.getHiddenCondition?.(
      previousIsRowSelected,
    );
    const nextHiddenCondition = nextColumn.getHiddenCondition?.(
      nextIsRowSelected,
    );

    return (
      equals(previousIsComponentHovered, nextIsComponentHovered) &&
      equals(previousFormattedString, nextFormatttedString) &&
      equals(previousColSpan, nextColSpan) &&
      equals(previousTruncateCondition, nextTruncateCondition) &&
      equals(previousHiddenCondition, nextHiddenCondition) &&
      equals(previousHiddenCondition, nextHiddenCondition) &&
      equals(
        previousRenderComponentOnRowUpdate && previousRow,
        nextRenderComponentOnRowUpdate && nextRow,
      )
    );
  },
);

export default MemoizedColumnCell;
export { BodyTableCell, useStyles };
