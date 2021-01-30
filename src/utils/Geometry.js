export const getPos = (index, i, length, max) => {
  const minx = 100 * index;
  const height = 200 * length - 100;
  const y = (100 * (2 * max - 1) - height) / 2;
  const miny = 200 * i + y;
  return { x: minx + 25, y: miny + 25 };
}

export const pointAboveLine = (slope, base, x, y) => {
  if (y <= slope * x + base) {
    return 1;
  }
  return 0;
}

export const pointBetweenLine = (l0, l1, p) => {
  if (l0.y === l1.y) {
    return (p.x >= l0.x && p.x <= l1.x);
  }

  const perp = -(l1.x - l0.x) / (l1.y - l0.y);
  const b0 = l0.y - perp * l0.x;
  const b1 = l1.y - perp * l1.x;

  return (pointAboveLine(perp, b0, p.x, p.y) + pointAboveLine(perp, b1, p.x, p.y))
    === 1;
}

export const rectOverlap = (l1, r1, l2, r2) => {
  if (l1.x >= r2.x || l2.x >= r1.x) {
    return false;
  }

  if (l1.y >= r2.y || l2.y >= r1.y) {
    return false;
  }

  return true;
}

export const rectContainsPoint = (p, r, w, h) => {
  return ((p.x >= r.x && p.x <= r.x + w) && (p.y >= r.y && p.y <= r.y + h));
}

export const rectContainsLine = (l0, l1, r, w, h) => {
  return rectContainsPoint(l0, r, w, h) || rectContainsPoint(l1, r, w, h);
}

export const lineContainsRect = (l0, l1, r, w, h) => {
  return pointBetweenLine(l0, l1, r)
    || pointBetweenLine(l0, l1, { x: r.x + w, y: r.y })
    || pointBetweenLine(l0, l1, { x: r.x, y: r.y + h })
    || pointBetweenLine(l0, l1, { x: r.x + w, y: r.y + h });
}

export const isDist = (p1, p2, r) => {
  return (Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) <= r);
}