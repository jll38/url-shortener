export function getTime(zTime) {
  const date = new Date(zTime);

  return `${date.toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  })}`;
}

export function getDate(zTime) {
  const date = new Date(zTime);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
