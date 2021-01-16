import React from 'react';
import Model from '../utils/Model';
import Layer from '../utils/Layer';
import { findAllByText } from '@testing-library/react';

const getPos = (index, i, length, maxx, maxy, w, h) => {
  const minx = 100 * index;
  const height = 200 * length - 100;
  const y = (100 * (2 * maxy - 1) - height) / 2;
  const miny = 200 * i + y;
  const offx = (w - 50 * (2 * maxx - 1)) / 2;
  const offy = (h - 100 * (2 * maxy - 1)) / 2;
  const retx = minx + offx;
  const rety = miny + offy;
  return { x: retx, y: rety };
}

const pointAboveLine = (slope, base, x, y) => {
  if (y <= slope * x + base) {
    return 1;
  }
  return 0;
}

const pointBetweenLine = (l0, l1, p) => {
  if (l0.y === l1.y) {
    return (p.x >= l0.x && p.x <= l1.x);
  }

  const perp = -(l1.x - l0.x) / (l1.y - l0.y);
  const b0 = l0.y - perp * l0.x;
  const b1 = l1.y - perp * l1.x;

  return (pointAboveLine(perp, b0, p.x, p.y) + pointAboveLine(perp, b1, p.x, p.y))
    === 1;
}

const rectContainsPoint = (p, r, w, h) => {
  return ((p.x >= r.x && p.x <= r.x + w) && (p.y >= r.y && p.y <= r.y + h));
}

const rectContainsLine = (l0, l1, r, w, h) => {
  return rectContainsPoint(l0, r, w, h) || rectContainsPoint(l1, r, w, h);
}

const lineContainsRect = (l0, l1, r, w, h) => {
  return pointBetweenLine(l0, l1, r)
    || pointBetweenLine(l0, l1, { x: r.x + w, y: r.y })
    || pointBetweenLine(l0, l1, { x: r.x, y: r.y + h })
    || pointBetweenLine(l0, l1, { x: r.x + w, y: r.y + h });
}

export default class ModelDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomPerc: 1.0,
      width: props.width,
      height: props.height,
      ratio: props.width / props.height,
      zoomheight: props.height,
      x: 0,
      y: 0,
      model: new Model([new Layer({
        type: 'input',
        units: 4
      })], [new Layer({
        type: 'dense',
        units: 4
      })]),

      canvas: null,
      ctx: null
    };
  }

  initialDraw() {
    const toDraw = this.state.model;
    toDraw.render();

    this.setState({
      model: toDraw
    });

    let width = toDraw.renderOrder.length;
    let height = 0;
    toDraw.renderOrder.forEach(item => {
      if (item.length > height) {
        height = item.length;
      }
    });

    height = 100 * (2 * height - 1); //100 units per layer + 100 between each layer
    width = 50 * (2 * width - 1); //50 units per layer + 50 between each layer

    const ratio = width / height;
    if (ratio >= this.state.ratio) {
      this.setState({
        zoomheight: width / this.state.ratio
      });
    } else {
      this.setState({
        zoomheight: height
      });
    }
  }

  draw() {
    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;
    const height = this.state.zoomheight / this.state.zoomPerc;

    const ctx = this.state.ctx;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, this.state.width, this.state.height);
    // Determine what model layers/connections will need to be drawn
    const renderOrder = this.state.model.renderOrder;

    let max = 0;
    renderOrder.forEach(i => {
      if (i.length > max) {
        max = i.length;
      }
    })

    // We map to isolate the horizontally visible connections, then filter out
    // the vertically visible connections.

    const toRender = renderOrder.map((item, index, arr) => {
      return item.filter((element, i) => {
        const pos = getPos(index, i, item.length, renderOrder.length, max, width, height);
        return this.layerFits(pos)
          || this.connectionFits(element, pos, arr, index, max);
      });
    });

    // Now we take each net piece and find its position on the canvas
    toRender.forEach((layer, i) => {
      let index = -1;
      const size = renderOrder[i].length;
      if (size === layer.length) {
        index = 0;
      }
      layer.forEach((conn, j) => {
        if (index === -1) {
          const id = conn.id;
          renderOrder[i].forEach((match, k) => {
            if (match.id === id) {
              index = k;
            }
          });
        }
        this.drawNet(this.getCoords(getPos(i, index + j, size, renderOrder.length, max, width, height)), conn, max, width, height);
      });
    });
  }

  layerFits(pos) {
    const minx = pos.x;
    const miny = pos.y;
    const maxx = minx + 50;
    const maxy = miny + 100;

    const x = this.state.x // x position of top left of view rectangle in units
    const y = this.state.y // y position of top left of view rectangle in units
    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;
    const height = this.state.zoomheight / this.state.zoomPerc;

    return ((minx >= x && minx <= x + width) || (maxx >= x && maxx <= x + width))
      && ((miny >= y && miny <= y + height) || (maxy >= y && maxy <= y + height));
  }

  connectionFits(element, pos, renderOrder, index, max) {
    const x = this.state.x // x position of top left of view rectangle in units
    const y = this.state.y // y position of top left of view rectangle in units
    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;
    const height = this.state.zoomheight / this.state.zoomPerc;
    const x0 = pos.x + 50;
    const y0 = pos.y + 50;

    let toRet = false;

    element.next.forEach(item => {
      if (!toRet) {
        const id = item.id;
        for (let i = index + 1; i <= renderOrder.length; i++) {
          if (!toRet) {
            renderOrder[i].forEach((elem, j) => {
              if (!toRet && elem.id == id) {
                const pos2 = getPos(i, j, renderOrder[i].length, renderOrder.length, max, width, height);
                const x1 = pos2.x;
                const y1 = pos2.y + 50;
                const slope = (y1 - y0) / (x1 - x0);
                const base = y0 - slope * x0;
                let count = 0;
                count += pointAboveLine(slope, base, x, y);
                count += pointAboveLine(slope, base, x + width, y);
                count += pointAboveLine(slope, base, x, y + height);
                count += pointAboveLine(slope, base, x + width, y + height);
                if (count > 0 && count < 4) {
                  toRet = rectContainsLine({ x: x0, y: y0 }, { x: x1, y: y1 },
                    { x: x, y: y }, width, height)
                    || lineContainsRect({ x: x0, y: y0 }, { x: x1, y: y1 },
                      { x: x, y: y }, width, height);
                }
              }
            });
          }
        }
      }
    });

    return toRet;
  }

  getCoords(pos) {
    const x = this.state.x // x position of top left of view rectangle in units
    const y = this.state.y // y position of top left of view rectangle in units
    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;
    const height = this.state.zoomheight / this.state.zoomPerc;

    const rx = (pos.x - x) * (this.state.width / width);
    const ry = (pos.y - y) * (this.state.height / height);
    const cx = rx + 50 * (this.state.width / width);
    const cy = ry + 50 * (this.state.height / height);

    return { rx: rx, ry: ry, cx: cx, cy: cy };
  }

  drawNet(pos, layer, max, w, h) {
    const renderOrder = this.state.model.renderOrder;
    const ctx = this.state.ctx;
    ctx.fillStyle = '#000000';
    ctx.rect(pos.rx, pos.ry, pos.cx - pos.rx, 2 * (pos.cy - pos.ry));
    ctx.stroke();
    layer.next.forEach((item) => {
      ctx.beginPath();
      ctx.moveTo(pos.cx, pos.cy);
      const id = item.id;
      let indexx = -1;
      let indexy = -1;
      renderOrder.forEach((lay, i) => {
        if (indexx === -1) {
          lay.forEach((el, j) => {
            if (el.id === id) {
              indexx = i;
              indexy = j;
            }
          });
        }
      });
      const conpos = this.getCoords(getPos(indexx, indexy, renderOrder[indexx].length, renderOrder.length, max, w, h));
      ctx.lineTo(conpos.rx, conpos.cy);
      ctx.stroke();
    });
  }

  componentDidMount() {
    const canvas = this.refs.modelView;
    const ctx = canvas.getContext('2d');
    this.setState({
      canvas: canvas,
      ctx: ctx
    });
    this.initialDraw();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <canvas ref='modelView'
        width={this.state.width}
        height={this.state.height}
      />
    );
  }
}
