import Constants from "./constants"
import { SegmentLayoutData } from "./types"

export const calculateSegmentData = ({ width, height }: { width: number, height: number }): SegmentLayoutData => {
  const xCount = Math.floor(width / Constants.SEGMENT_SIZE)
  const yCount = Math.floor(height / Constants.SEGMENT_SIZE)
  return {
    xCount,
    yCount,
    width: width / xCount,
    height: height / yCount,
  }
}
