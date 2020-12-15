import React, { useState, memo } from "react";

const initRow = (rows) =>
  rows.reduce((obj, row) => {
    obj[row] = [0, 0, 0, 0, 0];
    return obj;
  }, {});

const getCheckboxString = (state) => {
  if (state === 1) {
    return "X";
  } else if (state === 2) {
    return "O";
  }
  return "?";
};

const SheetRows = memo(({ rows, handleClick }) => (
  <div>
    {Object.entries(rows).map(([key, checks]) => {
      return (
        <div key={key}>
          <div>{key}</div>
          {checks.map((check, index) => {
            return (
              <div key={index} onClick={() => handleClick(key, index)}>
                {getCheckboxString(check)}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
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
    <div>
      <div key="sus">Suspect</div>
      <SheetRows
        key="sus-r"
        rows={suspects}
        handleClick={(key, col) =>
          updateCheckbox(suspects, setSuspects, key, col)
        }
      />
      <div key="item">Item</div>
      <SheetRows
        key="item-r"
        rows={items}
        handleClick={(key, col) => updateCheckbox(items, setItems, key, col)}
      />
      <div key="loc">Location</div>
      <SheetRows
        key="loc-r"
        rows={locations}
        handleClick={(key, col) =>
          updateCheckbox(locations, setLocations, key, col)
        }
      />
    </div>
  );
};

export default HpSheet;
