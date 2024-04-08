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
    <div onClick={clickHandler} className="fixed z-20 end-5 bottom-24 group">
      <SpeedDial>
        <SpeedDialHandler className="h-16 w-16 bg-green-500">
          <IconButton size="lg" className="rounded-full">
            <PlusIcon className="h-12 w-12 transition-transform group-hover:rotate-45" />
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
