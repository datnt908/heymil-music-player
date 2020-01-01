export const PLAYER_UPDATE_QUEUE = "PlayerUpdateQueue";

export const playerUpdateQueue = (queue) => ({
  type: PLAYER_UPDATE_QUEUE,
  payload: queue,
});