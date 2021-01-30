import React from 'react';
import Model from '../utils/Model';
import Layer from '../utils/Layer';
import * as Geo from '../utils/Geometry';

const rcx = 100;
const rcy = 100;

export default class ModelDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Viewing state elements
      zoomPerc: 1.0,
      width: props.width, height: props.height,
      ratio: props.width / props.height,
      zoomheight: props.height,
      x: 0, y: 0, minx: 0, miny: 0,
      // Control state elements
      leftClick: false, posX: 0, posY: 0,
      rightClick: false, rx: 0, ry: 0,
      // Model state elements
      model: new Model([new Layer({
        type: 'input',
        units: 4
      })], [new Layer({
        type: 'dense',
        units: 4
      })]),
      // Canvas state elements
      canvas: null, ctx: null
    };
  }

  coordsToPos(coords) {
    const x = this.state.x // x position of top left of view rectangle in units
    const y = this.state.y // y position of top left of view rectangle in units
    const width = this.state.ratio * this.state.zoomheight / this.state.zoomPerc;
    const height = this.state.zoomheight / this.state.zoomPerc;
    return {
      x: width * coords.rx / this.state.width + x + 25,
      y: height * coords.ry / this.state.height + y + 25
    }
  }

  initialDraw() {
    const toDraw = this.state.model;
    toDraw.render();
    this.setState({ model: toDraw });

    let width = toDraw.renderOrder.length;
    let height = 0;
    toDraw.renderOrder.forEach(item => {
      if (item.length > height) height = item.length;
    });

    // 100 units per layer + 100 between each layer + 25 unit offset on either side
    height = 100 * (2 * height - 1) + 50;
    // 50 units per layer + 50 between each layer + 25 unit offset on either side
    width = 100 * width;

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
    const ctx = this.state.ctx;
    ctx.clearRect(0, 0, (this.state.width), (this.state.height));
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, (this.state.width), (this.state.height));
    // Determine what model layers/connections will need to be drawn
    const renderOrder = this.state.model.renderOrder;

    let max = 0;
    renderOrder.forEach(i => {
      if (i.length > max) max = i.length;
    })

    // We map to isolate the horizontally visible connections, then filter out
    // the vertically visible connections.

    const toRender = renderOrder.map((item, index, arr) => {
      return item.filter((element, i) => {
        const pos = Geo.getPos(index, i, item.length, max);
        return this.layerFits(pos)
          || this.connectionFits(element, pos, arr, index, max);
      });
    });

    // Now we take each net piece and find its position on the canvas
    toRender.forEach((layer, i) => {
      let index = -1;
      const size = renderOrder[i].length;
      if (size === layer.length)  index = 0;
      layer.forEach((conn, j) => {
        if (index === -1) {
          const id = conn.id;
          renderOrder[i].forEach((match, k) => {
            if (match.id === id) index = k;
          });
        }
        this.drawNet(this.getCoords(Geo.getPos(i, index + j, size, max)), conn, max);
      });
    });

    // If the right click menu is up, draw it
    if (this.state.rightClick) this.drawRCMenu();
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

    return Geo.rectOverlap(
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
                const pos2 = Geo.getPos(i, j, renderOrder[i].length, max);
                const x1 = pos2.x;
                const y1 = pos2.y + 50;
                const slope = (y1 - y0) / (x1 - x0);
                const base = y0 - slope * x0;
                let count = 0;
                count += Geo.pointAboveLine(slope, base, x, y);
                count += Geo.pointAboveLine(slope, base, x + width, y);
                count += Geo.pointAboveLine(slope, base, x, y + height);
                count += Geo.pointAboveLine(slope, base, x + width, y + height);
                if (count > 0 && count < 4) {
                  toRet = Geo.rectContainsLine({ x: x0, y: y0 }, { x: x1, y: y1 },
                    { x: x, y: y }, width, height)
                    || Geo.lineContainsRect({ x: x0, y: y0 }, { x: x1, y: y1 },
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

  drawNet(pos, layer, max) {
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
            if (el.id === id) { indexx = i; indexy = j; }
          });
        }
      });
      const conpos = this.getCoords(Geo.getPos(indexx, indexy, renderOrder[indexx].length, max));
      ctx.lineTo((conpos.rx), (conpos.cy));
      ctx.stroke();
    });
    if (layer.renderOptions) this.drawOptions(this.coordsToPos(pos));
  }

  drawRCMenu() {
    const canvas = this.refs.modelView;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.state.rx, this.state.ry, rcx, rcy);
    ctx.stroke();
  }

  drawOptions(pos) {
    const deleteCircle = this.getCoords({ x: pos.x, y: pos.y - 37.5 });
    const nextCircle = this.getCoords({ x: pos.x + 37.5, y: pos.y });
    const adjacentCircle = this.getCoords({ x: pos.x + 37.5, y: pos.y + 50 });
    //const radius = 12.5 * this.state.zoomPerc * this.state.height / this.state.zoomheight;
    const radius = 40;
    const canvas = this.refs.modelView;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(deleteCircle.rx, deleteCircle.ry, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(nextCircle.rx, nextCircle.ry, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(adjacentCircle.rx, adjacentCircle.ry, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }

  componentDidMount() {
    const canvas = this.refs.modelView;
    const ctx = canvas.getContext('2d');
    this.setState({ canvas: canvas, ctx: ctx });
    this.initialDraw();
    canvas.addEventListener('mousedown', e => this.onMouseDown(e));
    canvas.addEventListener('mouseup', e => this.onMouseUp(e));
    canvas.addEventListener('mousemove', e => this.onMouseMove(e));
    canvas.addEventListener('wheel', e => this.onScroll(e));
    canvas.addEventListener('contextmenu', e =>  e.preventDefault());
  }

  componentDidUpdate() { this.draw(); }

  mouseOnOption(mpos, rpos) {
    const deleteCircle = { x: rpos.x + 25, y: rpos.y - 12.5 };
    const nextCircle = { x: rpos.x + 62.5, y: rpos.y + 25 };
    const adjacentCircle = { x: rpos.x + 62.5, y: rpos.y + 75 };
    const radius = 40 * this.state.zoomheight * this.state.zoomPerc / this.state.height;
    return Geo.isDist(mpos, deleteCircle, radius)
      || Geo.isDist(mpos, nextCircle, radius)
      || Geo.isDist(mpos, adjacentCircle, radius);
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
        posX: pos.x, posY: pos.y
      });
    }
    if (e.button === 2) {
      this.setState({
        rightClick: true,
        rx: mousex, ry: mousey
      });
    }
  }

  onMouseUp(e) {
    if (e.button === 0) this.setState({ leftClick: false });
  }

  onMouseMove(e) {
    this.state.canvas.style.cursor = 'default';
    const minx = this.state.minx;
    const miny = this.state.miny;
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
    if (this.state.leftClick) {
      let newX = x - pos.x + this.state.posX;
      let newY = y - pos.y + this.state.posY;

      if (newX < minx) newX = minx;
      else if (newX + width > minx + maxX) newX = minx + maxX - width;

      if (newY < miny) newY = miny;
      else if (newY + height > miny + maxY) newY = miny + maxY - height;

      this.setState({ x: newX, y: newY });
    } else {
      const model = this.state.model;
      let max = 0;
      model.renderOrder.forEach(i => {
        if (i.length > max) max = i.length;
      });
      let selected = false;
      let prev = { exists: false };
      let current = { exists: false };
      model.renderOrder = model.renderOrder.map((layer, index) => {
        const newLayer = layer.map((node, i) => {
          const newNode = node;
          if (node.renderOptions) {
            prev = { i: index, j: i, exists: true };
            if (!selected) current = prev;
          }
          const rectPos = Geo.getPos(index, i, layer.length, max);
          newNode.renderOptions = Geo.rectContainsPoint(pos, rectPos, 50, 100);
          if (newNode.renderOptions) {
            selected = true;
            current = { i: index, j: i, exists: true };
            this.state.canvas.style.cursor = 'pointer';
          }
          return newNode;
        });
        return newLayer;
      });
      if (!selected && prev.exists) {
        model.renderOrder[prev.i][prev.j].renderOptions = true;
      }
      this.setState({ model: model });
      if (current.exists) {
        if (this.mouseOnOption(pos, Geo.getPos(current.i, current.j, 
          model.renderOrder[current.i].length, max))) {
          this.state.canvas.style.cursor = 'pointer';
        }
      }
    }
    if (this.state.rightClick) {
      if (mousex >= this.state.rx && mousex <= this.state.rx + rcx
        && mousey >= this.state.ry && mousey <= this.state.ry + rcy) {
        this.state.canvas.style.cursor = 'pointer';
      }
    }
  }

  onScroll(e) {
    let isZooming = false;
    if (e.deltaY < 0) isZooming = true;
    let zoomperc = this.state.zoomPerc;

    if (isZooming) zoomperc *= 1.1;
    else zoomperc = Math.max(1, zoomperc / 1.1);

    const minx = this.state.minx;
    const miny = this.state.miny;
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

    if (setX < minx) setX = minx;
    else if (setX + newWidth > minx + maxX) setX = minx + maxX - newWidth;

    if (setY < miny) setY = miny;
    else if (setY + newHeight > miny + maxY) setY = miny + maxY - newHeight;

    this.setState({
      zoomPerc: zoomperc,
      x: setX, y: setY
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
