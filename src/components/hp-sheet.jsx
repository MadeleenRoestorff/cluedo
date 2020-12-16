import React, { useState, useEffect } from "react";
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
  const [suspects, setSuspects] = useState(false);
  const [items, setItems] = useState(false);
  const [locations, setLocations] = useState(false);

  const initSheet = () => {
    let tempSus = false;
    try {
      tempSus = JSON.parse(window.localStorage.getItem("suspects"));
    } catch {}

    if (!tempSus) {
      tempSus = initRow(suspectsInit);
    }
    setSuspects(tempSus);

    let tempItems = false;
    try {
      tempItems = JSON.parse(window.localStorage.getItem("items"));
    } catch {}
    if (!tempItems) {
      tempItems = initRow(itemsInit);
    }
    setItems(tempItems);

    let tempLoc = false;
    try {
      tempLoc = JSON.parse(window.localStorage.getItem("locations"));
    } catch {}
    if (!tempLoc) {
      tempLoc = initRow(locationsInit);
    }
    setLocations(tempLoc);
  };

  const clearSheet = () => {
    window.localStorage.removeItem("suspects");
    window.localStorage.removeItem("items");
    window.localStorage.removeItem("locations");
    initSheet();
  };

  useEffect(() => {
    if (suspects) {
      window.localStorage.setItem("suspects", JSON.stringify(suspects));
    }
  }, [suspects]);

  useEffect(() => {
    if (items) {
      window.localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  useEffect(() => {
    if (locations) {
      window.localStorage.setItem("locations", JSON.stringify(locations));
    }
  }, [locations]);

  useEffect(() => {
    initSheet();
  }, []);

  return (
    <NotepadContainerStyling>
      {!suspects ? null : (
        <>
          <Styledh3 key="sus">Suspect</Styledh3>
          <SheetRows
            key="sus-r"
            rows={suspects}
            handleClick={(key, col) =>
              updateCheckbox(suspects, setSuspects, key, col)
            }
          />
        </>
      )}
      {!items ? null : (
        <>
          <Styledh3 key="item">Item</Styledh3>
          <SheetRows
            key="item-r"
            rows={items}
            handleClick={(key, col) =>
              updateCheckbox(items, setItems, key, col)
            }
          />
        </>
      )}
      {!locations ? null : (
        <>
          <Styledh3 key="loc">Location</Styledh3>
          <SheetRows
            key="loc-r"
            rows={locations}
            handleClick={(key, col) =>
              updateCheckbox(locations, setLocations, key, col)
            }
          />
        </>
      )}

      <StyledButton onClick={clearSheet}>Clear</StyledButton>
    </NotepadContainerStyling>
  );
};

export default HpSheet;

// Styles //
const StyledButton = styled.button``;

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
