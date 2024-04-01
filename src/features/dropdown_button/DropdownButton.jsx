import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const DropdownButton = ({ actions }) => {
  const [collapsed, setCollapsed] = useState(true);
  const safe_area_ref = useRef(null);

  const handleSetCollapsed = (e) => {
    if (
      safe_area_ref.current &&
      !safe_area_ref.current.contains(e.target) &&
      !collapsed
    ) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleSetCollapsed);
    return () => {
      document.removeEventListener("mousedown", handleSetCollapsed);
    };
  });

  return (
    <span className="relative">
      <div
        className="p-1 bg-white hover:bg-light-gray-1 border border-light-gray-border rounded-sm"
        onClick={(e) => {
          setCollapsed(false);
          e.stopPropagation();
        }}
      >
        <IoMdArrowDropdown />
      </div>
      {!collapsed && (
        <div
          ref={safe_area_ref}
          className="absolute z-10 bg-white border border-light-gray-border rounded-sm"
        >
          <ul className="min-w-32 divide-y divide-solid">
            {actions &&
              actions.map((action) => (
                <li
                  id={action.label}
                  onClick={() => {
                    action.action();
                    setCollapsed(true);
                  }}
                  className="p-2 cursor-pointer hover:bg-light-gray-2"
                >
                  {action.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </span>
  );
};

export default DropdownButton;
