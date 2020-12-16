import React, { memo } from "react";
import styled from "styled-components";

export const checkboxMarks = ["", "X", "O", "✓"];

const getCheckboxString = (state) => {
  if (state < 0 || state >= checkboxMarks) {
    state = 0;
  }
  return checkboxMarks[state];
};

const SheetRows = memo(({ rows, handleClick }) => (
  <ClueGroupContainerStyling>
    {Object.entries(rows).map(([key, checks]) => {
      if (!Array.isArray(checks)) {
        return null;
      }
      return (
        <ClueRowStyling key={key}>
          <ClueTitleStyling>{key}</ClueTitleStyling>
          {checks.map((check, index) => {
            return (
              <OptionsStyling
                key={index}
                onClick={() => handleClick(key, index)}
              >
                {getCheckboxString(check)}
              </OptionsStyling>
            );
          })}
        </ClueRowStyling>
      );
    })}
  </ClueGroupContainerStyling>
));

export default SheetRows;

// Styles //
const ClueRowStyling = styled.div`
  display: flex;
  border-bottom: 1px solid grey;
`;
const ClueTitleStyling = styled.div`
  width: 60vw;
  max-width: 300px;
`;
const OptionsStyling = styled.div`
  width: calc(40vw / 5);
  text-align: center;
  max-width: 40px;
  border-right: 1px solid grey;
  cursor: pointer;
`;
const ClueGroupContainerStyling = styled.div`
  margin-bottom: 10px;
`;
