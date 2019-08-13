// export function isEmpty(obj: any) {
//   return (
//     [Object, Array].includes((obj || {}).constructor) &&
//     !Object.entries(obj || {}).length
//   );
// }

export function groupByProperty<T extends { [key: string]: string }>(
  data: T[],
  property: string
) {
  return data.reduce(
    (groups: { [key: string]: T[] }, item: T) => {
      const groupKey = item[property].toString();
      const group = groups[groupKey] || [];
      group.push(item);
      groups[groupKey] = group;
      return groups;
    },
    {} as { [key: string]: T[] }
  );
}

export function shuffle<T>(array: T[]) {
  let m = array.length;
  let t: T;
  let i: number;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
