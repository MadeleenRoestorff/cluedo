import React, { useState } from "react";
import styled from "styled-components";
import SheetRows from "./sheet-rows";

const initRow = (rows) =>
  rows.reduce((obj, row) => {
    obj[row] = [0, 0, 0, 0, 0, 0];
    return obj;
  }, {});

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
  const [suspects, setSuspects] = useState(() => initRow(suspectsInit));
  const [items, setItems] = useState(() => initRow(itemsInit));
  const [locations, setLocations] = useState(() => initRow(locationsInit));
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
const Styledh3 = styled.h3`
  margin-bottom: 2px;
  border-bottom: 1px solid grey;
`;

const NotepadContainerStyling = styled.div`
  max-width: 500px;
  margin: 10px auto;
`;

// consts
const suspectsInit = [
  "Fenrir Greyback",
  "Lucius Malfoy",
  "Peter Pettigrew",
  "Draco Malfoy",
  "Snatcher",
  "Bellatrix Lestrange",
];

const itemsInit = [
  "Jinxed Broomstick",
  "Cursed Necklace",
  "Love Potion",
  "Poisoned Mead",
  "Incendio",
  "Stupify",
];

const locationsInit = [
  "Malfoy Manor",
  "The Hog's Head",
  "The Shrieking Shack",
  "Hogwarts Castle",
  "Forbidden Forest",
  "Gringotts",
  "Weasleys' Wizard Wheezes",
  "Minestry of Magic",
  "12 Grimmauld Place",
];
