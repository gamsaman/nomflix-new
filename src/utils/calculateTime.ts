export const calculateTime = (time: number) => {
  const hour = Math.floor(time / 60);
  const minute = time - hour * 60;

  return `${hour}시간 ${minute}분`;
};
