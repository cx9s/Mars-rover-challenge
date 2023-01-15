const directions = ["L", "R"] as const;
export type Direction = typeof directions[number];

export type Move = "M";

export type Action = Direction | Move;
