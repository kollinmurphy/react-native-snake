import {
  Direction,
  Dot,
  SegmentLayoutData,
  Snake,
  SnakeSegment,
} from "./types";

export const horizontalDirectionToInteger = (dir: Direction) =>
  dir === "left" ? -1 : dir === "right" ? 1 : 0;
export const verticalDirectionToInteger = (dir: Direction) =>
  dir === "up" ? -1 : dir === "down" ? 1 : 0;

export const calculateNewPosition = (
  snake: Snake,
  layout: SegmentLayoutData
): [Snake, SnakeSegment] => {
  const oldTail = snake.segments[snake.segments.length - 1];
  const newTail: SnakeSegment[] = snake.segments.slice(0, -1);
  const newX =
    snake.segments[0].x + horizontalDirectionToInteger(snake.direction);
  const newY =
    snake.segments[0].y + verticalDirectionToInteger(snake.direction);
  const newHead: SnakeSegment = { x: newX, y: newY, id: Math.random() };
  if (newX < 0 || newX >= layout.xCount) throw new Error("Escaped X");
  if (newY < 0 || newY >= layout.yCount) throw new Error("Escaped Y");
  checkInternalCollision([oldTail, ...newTail, newHead], layout)
  return [
    {
      ...snake,
      segments: [newHead, ...newTail],
    },
    oldTail,
  ];
};

export const chooseDotPosition = (
  snake: Snake,
  layout: SegmentLayoutData
): Dot => {
  const positions = Array.from(
    { length: layout.xCount * layout.yCount },
    (_, i) => ({ x: i % layout.xCount, y: Math.floor(i / layout.xCount) })
  ).filter((i) => !snake.segments.some((s) => s.x === i.x && s.y === i.y));
  if (positions.length === 0) throw new Error("Unable to find a dot position");
  const i = Math.floor(Math.random() * positions.length);
  return positions[i];
};

export const checkInternalCollision = (
  segments: SnakeSegment[],
  layout: SegmentLayoutData
) => {
  const pos = new Set(segments.map((s) => s.x + s.y * layout.yCount));
  if (pos.size !== segments.length) throw new Error("Internal collision");
};

export const checkDotCollision = (snake: Snake): boolean => {
  return snake.segments.some(
    (s) => s.x === snake.dot?.x && s.y === snake.dot?.y
  );
};
