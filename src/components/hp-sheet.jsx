import React, { useState, memo } from "react";
import styled from "styled-components";

const initRow = (rows) =>
  rows.reduce((obj, row) => {
    obj[row] = [0, 0, 0, 0, 0, 0];
    return obj;
  }, {});

const getCheckboxString = (state) => {
  if (state === 1) {
    return "X";
  } else if (state === 2) {
    return "O";
  }
  return "";
};

const SheetRows = memo(({ rows, handleClick }) => (
  <ClueGroupContainerStyling>
    {Object.entries(rows).map(([key, checks]) => {
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

const updateCheckbox = (group, setGroup, key, column) => {
  let newVal = group[key][column] + 1;
  if (newVal > 2) {
    newVal = 0;
  }
  let newGroup = { ...group };
  newGroup[key][column] = newVal;
  setGroup({ ...newGroup });
};

const HpSheet = () => {
  const [suspects, setSuspects] = useState(() =>
    initRow([
      "Fenrir Greyback",
      "Lucius Malfoy",
      "Peter Pettigrew",
      "Draco Malfoy",
      "Snatcher",
      "Bellatrix Lestrange",
    ])
  );
  const [items, setItems] = useState(() =>
    initRow([
      "Jinxed Broomstick",
      "Cursed Necklace",
      "Love Potion",
      "Poisoned Mead",
      "Incendio",
      "Stupify",
    ])
  );
  const [locations, setLocations] = useState(() =>
    initRow([
      "Malfoy Manor",
      "The Hog's Head",
      "The Shrieking Shack",
      "Hogwarts Castle",
      "Forbidden Forest",
      "Gringotts",
      "Weasleys' Wizard Wheezes",
      "Minestry of Magic",
      "12 Grimmauld Place",
    ])
  );
  return (
    <NotepadContainerStyling>
      <Styledh3 key="sus">Suspect</Styledh3>
      <SheetRows
        key="sus-r"
        rows={suspects}
        handleClick={(key, col) =>
          updateCheckbox(suspects, setSuspects, key, col)
        }
      />
      <Styledh3 key="item">Item</Styledh3>
      <SheetRows
        key="item-r"
        rows={items}
        handleClick={(key, col) => updateCheckbox(items, setItems, key, col)}
      />
      <Styledh3 key="loc">Location</Styledh3>
      <SheetRows
        key="loc-r"
        rows={locations}
        handleClick={(key, col) =>
          updateCheckbox(locations, setLocations, key, col)
        }
      />
    </NotepadContainerStyling>
  );
};

export default HpSheet;

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
const Styledh3 = styled.h3`
  margin-bottom: 2px;
  border-bottom: 1px solid grey;
`;

const NotepadContainerStyling = styled.div`
  max-width: 500px;
  margin: 10px auto;
`;
