import React, { MutableRefObject, ReactNode, useRef } from "react";
import { SegmentLayoutData } from "../logic/types";

type ContextValue = undefined | MutableRefObject<SegmentLayoutData | undefined>
const LayoutDataContext = React.createContext<ContextValue>(undefined);

export const LayoutDataProvider = ({ children }: { children: ReactNode }) => {
  const snake = useRef<SegmentLayoutData | undefined>()
  return (
    <LayoutDataContext.Provider value={snake}>
      {children}
    </LayoutDataContext.Provider>
  )
};

export const useLayoutData = () => {
  const data = React.useContext(LayoutDataContext)
  if (data === undefined)
    throw new Error('Unable to find LayoutDataProvider')
  return data
};

export default useLayoutData;
