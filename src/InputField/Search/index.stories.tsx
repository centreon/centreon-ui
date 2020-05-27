import React from 'react';

import SearchInput from '.';
import RegexpHelpTooltip from './RegexpHelpTooltip';
import PersistentTooltip from './PersistentTooltip';

export default { title: 'InputField/Search' };

export const normal = (): JSX.Element => <SearchInput />;

export const label = (): JSX.Element => <SearchInput label="Search" />;

const tooltipDescription = (
  <>
    <p>Here is how you can use this search input</p>
    <p>Just type something</p>
  </>
);

const tooltipExamples = [
  <li key="first">First example</li>,
  <li key="second">Second example</li>,
  <li key="third">Third example</li>,
];

const RegexpHelp = (): JSX.Element => (
  <RegexpHelpTooltip
    description={tooltipDescription}
    examples={tooltipExamples}
    labelExamples="Here are some examples"
    labelSearchHelp="search input"
    labelTips="Tips"
    labelGetHelp="This link should help you"
    urlTip="https://regex101.com"
    labelUrlTip="regex101.com"
  />
);

export const searchInputWithRegexpHelpTooltip = (): JSX.Element => (
  <SearchInput
    placeholder="Search"
    EndAdornment={(): JSX.Element => <RegexpHelp />}
  />
);

const PersistentHelpTooltip = (): JSX.Element => (
  <PersistentTooltip labelSearchHelp="search input">
    <div>
      <p>Here is a simple persistent </p>
      <p>With a description about the input</p>
    </div>
  </PersistentTooltip>
);

export const searchInputWithPersistentHelpTooltip = (): JSX.Element => (
  <SearchInput
    placeholder="Search"
    EndAdornment={(): JSX.Element => <PersistentHelpTooltip />}
  />
);
