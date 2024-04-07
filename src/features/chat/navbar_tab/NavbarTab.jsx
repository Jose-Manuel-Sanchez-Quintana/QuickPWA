import { useState } from "react";

const NavbarTab = ({ index, selected, label, callback }) => {
  // const [selected, setSelected] = useState(false)

  return (
    <button
      className={`flex items-center px-3 hover:light-gray-3 box-content ${
        selected && "border-b-4"
      }`}
      onClick={() => {
        callback(index);
      }}
      type="button"
    >
      <span>{label}</span>
    </button>
  );
};

export default NavbarTab;
