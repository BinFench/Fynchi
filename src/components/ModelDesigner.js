import React from 'react';
import Model from '../utils/Model';
import Layer from '../utils/Layer';

const rcx = 100;
const rcy = 100;

const getPos = (index, i, length, max) => {
  const minx = 100 * index;
  const height = 200 * length - 100;
  const y = (100 * (2 * max - 1) - height) / 2;
  const miny = 200 * i + y;
  return { x: minx, y: miny };
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

const rectOverlap = (l1, r1, l2, r2) => {
  if (l1.x >= r2.x || l2.x >= r1.x) {
    return false;
  }

  if (l1.y >= r2.y || l2.y >= r1.y) {
    return false;
  }

  return true;
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
      // Viewing state elements
      zoomPerc: 1.0,
      width: props.width,
      height: props.height,
      ratio: props.width / props.height,
      zoomheight: props.height,
      x: 0,
      y: 0,
      minx: 0,
      miny: 0,
      // Control state elements
      leftClick: false,
      posX: 0,
      posY: 0,
      rightClick: false,
      rx: 0,
      ry: 0,
      // Model state elements
      model: new Model([new Layer({
        type: 'input',
        units: 4
      })], [new Layer({
        type: 'dense',
        units: 4
      })]),
      // Canvas state elements
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
        zoomheight: width / this.state.ratio,
        y: (height - width / this.state.ratio) / 2,
        miny: (height - width / this.state.ratio) / 2
      });
    } else {
      this.setState({
        zoomheight: height,
        x: (width - height * this.state.ratio) / 2,
        minx: (width - height * this.state.ratio) / 2
      });
    }

  }

  draw() {
    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;
    const height = this.state.zoomheight / this.state.zoomPerc;

    const ctx = this.state.ctx;
    ctx.clearRect(0, 0, (this.state.width), (this.state.height));
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, (this.state.width), (this.state.height));
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
        const pos = getPos(index, i, item.length, max);
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
        this.drawNet(this.getCoords(getPos(i, index + j, size, max)), conn, max, width, height);
      });
    });

    // If the right click menu is up, draw it
    if (this.state.rightClick) {
      this.drawRCMenu();
    }
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

    return rectOverlap(
      { x: minx, y: miny },
      { x: maxx, y: maxy },
      { x: x, y: y },
      { x: x + width, y: y + height });
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
        for (let i = index + 1; i < renderOrder.length; i++) {
          if (!toRet) {
            renderOrder[i].forEach((elem, j) => {
              if (!toRet && elem.id === id) {
                const pos2 = getPos(i, j, renderOrder[i].length, max);
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
    ctx.rect((pos.rx), (pos.ry), (pos.cx - pos.rx), (2 * (pos.cy - pos.ry)));
    ctx.stroke();
    layer.next.forEach((item) => {
      ctx.beginPath();
      ctx.moveTo((pos.cx), (pos.cy));
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
      const conpos = this.getCoords(getPos(indexx, indexy, renderOrder[indexx].length, max));
      ctx.lineTo((conpos.rx), (conpos.cy));
      ctx.stroke();
    });
  }

  drawRCMenu() {
    const canvas = this.refs.modelView;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.state.rx, this.state.ry, rcx, rcy);
    ctx.stroke();
  }

  componentDidMount() {
    const canvas = this.refs.modelView;
    const ctx = canvas.getContext('2d');
    this.setState({
      canvas: canvas,
      ctx: ctx
    });
    this.initialDraw();
    canvas.addEventListener('mousedown', e => this.onMouseDown(e));
    canvas.addEventListener('mouseup', e => this.onMouseUp(e));
    canvas.addEventListener('mousemove', e => this.onMouseMove(e));
    canvas.addEventListener('wheel', e => this.onScroll(e));
    canvas.addEventListener('contextmenu', e => {
      e.preventDefault();
      return false;
    });
  }

  componentDidUpdate() {
    this.draw();
  }

  onMouseDown(e) {
    const maxX = this.state.ratio * this.state.zoomheight;
    const maxY = this.state.zoomheight;
    const x = this.state.x // x position of top left of view rectangle in units
    const y = this.state.y // y position of top left of view rectangle in units
    const width = maxX / this.state.zoomPerc;
    const height = maxY / this.state.zoomPerc;
    const rect = this.state.canvas.getBoundingClientRect();
    const mousex = e.clientX - rect.left;
    const mousey = e.clientY - rect.top;
    const pos = {
      x: x + (mousex / this.state.width) * width,
      y: y + (mousey / this.state.height) * height
    };

    if (e.button === 0) {
      if (this.state.rightClick) {
        if (mousex >= this.state.rx
          && mousex <= this.state.rx + rcx
          && mousey >= this.state.ry
          && mousey <= this.state.ry + rcy) {

        } else {
          this.setState({
            rightClick: false
          })
        }
      }
      this.setState({
        leftClick: true,
        posX: pos.x,
        posY: pos.y
      });
    }
    if (e.button === 2) {
      this.setState({
        rightClick: true,
        rx: mousex,
        ry: mousey
      });
    }
  }

  onMouseUp(e) {
    if (e.button === 0) {
      this.setState({
        leftClick: false
      });
    }
  }

  onMouseMove(e) {
    if (this.state.leftClick) {
      const maxX = this.state.ratio * this.state.zoomheight;
      const maxY = this.state.zoomheight;
      const x = this.state.x // x position of top left of view rectangle in units
      const y = this.state.y // y position of top left of view rectangle in units
      const width = maxX / this.state.zoomPerc;
      const height = maxY / this.state.zoomPerc;
      const rect = this.state.canvas.getBoundingClientRect();
      const mousex = e.clientX - rect.left;
      const mousey = e.clientY - rect.top;
      const pos = {
        x: x + (mousex / this.state.width) * width,
        y: y + (mousey / this.state.height) * height
      };

      let newX = x - pos.x + this.state.posX;
      let newY = y - pos.y + this.state.posY;

      if (newX < this.state.minx) {
        newX = this.state.minx;
      } else if (newX + width > this.state.minx + maxX) {
        newX = this.state.minx + maxX - width;
      }

      if (newY < this.state.miny) {
        newY = this.state.miny;
      } else if (newY + height > this.state.miny + maxY) {
        newY = this.state.miny + maxY - height;
      }

      this.setState({
        x: newX,
        y: newY
      });
    }
  }

  onScroll(e) {
    let isZooming = false;
    if (e.deltaY < 0) {
      isZooming = true;
    }
    let zoomperc = this.state.zoomPerc;

    if (isZooming) {
      zoomperc *= 1.1;
    } else {
      zoomperc = Math.max(1, zoomperc / 1.1);
    }

    const maxX = this.state.ratio * this.state.zoomheight;
    const maxY = this.state.zoomheight;
    const x = this.state.x // x position of top left of view rectangle in units
    const y = this.state.y // y position of top left of view rectangle in units
    const width = maxX / this.state.zoomPerc;
    const height = maxY / this.state.zoomPerc;

    const rect = this.state.canvas.getBoundingClientRect();
    const mousex = e.clientX - rect.left;
    const mousey = e.clientY - rect.top;

    const pos = {
      x: x + (mousex / this.state.width) * width,
      y: y + (mousey / this.state.height) * height
    };

    // adjust x, y so that pos is at the mouse position after zooming
    const newWidth = maxX / zoomperc;
    const newHeight = maxY / zoomperc;
    const newX = x + pos.x - ((mousex / this.state.width) * newWidth + x);
    const newY = y + pos.y - ((mousey / this.state.height) * newHeight + y);

    let setX = newX;
    let setY = newY;

    if (setX < this.state.minx) {
      setX = this.state.minx;
    } else if (setX + newWidth > this.state.minx + maxX) {
      setX = this.state.minx + maxX - newWidth;
    }

    if (setY < this.state.miny) {
      setY = this.state.miny;
    } else if (setY + newHeight > this.state.miny + maxY) {
      setY = this.state.miny + maxY - newHeight;
    }

    this.setState({
      zoomPerc: zoomperc,
      x: setX,
      y: setY
    });
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
