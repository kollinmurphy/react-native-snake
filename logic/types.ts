
export interface SnakeSegment {
  id: number;
  x: number;
  y: number;
}

export interface Dot {
  x: number;
  y: number;
}

export interface Snake {
  segments: SnakeSegment[];
  direction: Direction;
  lost: boolean;
  dot: Dot | undefined;
  started: boolean;
}

export interface SegmentLayoutData {
  width: number;
  height: number;
  xCount: number;
  yCount: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right'
