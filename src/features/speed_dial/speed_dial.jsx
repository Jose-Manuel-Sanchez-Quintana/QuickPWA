import React from "react";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

export const Speed_Dial = ({ clickHandler }) => {
  return (
    <div onClick={clickHandler} className="fixed z-0 end-6 bottom-20 group block sm:hidden">
      <SpeedDial>
        <SpeedDialHandler className="h-20 w-20 bg-green-500">
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-20 w-20 transition-transform group-hover:rotate-45" />
          </IconButton>
        </SpeedDialHandler>
        {/* <SpeedDialContent>
          <SpeedDialAction>
            <HomeIcon className="h-5 w-5" />
          </SpeedDialAction>
          <SpeedDialAction>
            <CogIcon className="h-5 w-5" />
          </SpeedDialAction>
          <SpeedDialAction>
            <Square3Stack3DIcon className="h-5 w-5" />
          </SpeedDialAction>
        </SpeedDialContent> */}
      </SpeedDial>
    </div>
  );
};
