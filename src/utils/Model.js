export default class Model {
    constructor(input, output) {
        this.input = input;
        this.output = output;
        this.layers = [...input, ...output];
        this.renderOrder = [];
        // this.input.forEach(i => {
        //     this.output.forEach(o => {
        //         i.addNext(o);
        //         o.addPrev(i);
        //     })
        // });
    }

    addNext(layerNum, layer) {
        layer.addPrev(this.layers[layerNum]);
        this.layers[layerNum].addNext(layer);
        this.layers.push(layer);
    }

    addAdjacent(layerNum, layer) {
        // For every layer that connects to the layer we add an adjacency to,
        // append the adjacency.
        const id = this.layers[layerNum].id;

        this.layers = this.layers.map(item => {
            item.next.forEach(element => {
                if (element.id === id) {
                    layer.addPrev(element);
                    item.addNext(layer);
                }
            });
            return item;
        });
        this.layers.push(layer);
        const inIDs = [...(this.input).id];
        const outIDs = [...(this.output).id];

        const ini = inIDs.indexOf(id);
        const outi = outIDs.indexOf(id);

        if (ini !== -1) {
            this.input.push(layer);
        }
        if (outi !== -1) {
            this.output.push(layer);
        }
    }

    removeLayer(layerNum) {
        // Every layer that the removed layer connects to is connected to
        // the previous layer.
        const layer = this.layers[layerNum];
        layer.next.map(item => {
            item.prev.filter(elem => elem.id !== layer.id);
            layer.prev.forEach(prev => item.addPrev(prev));
            return item;
        });
        layer.prev.map(item => {
            item.next.filter(elem => elem.id !== layer.id);
            layer.next.forEach(next => item.addnext(next));
            return item;
        });

        const inIDs = [...(this.input).id];
        const outIDs = [...(this.output).id];

        const ini = inIDs.indexOf(layer.id);
        const outi = outIDs.indexOf(layer.id);

        if (ini !== -1) {
            layer.next.forEach(next => {
                if (next.prev.length === 0 &&
                    outIDs.indexOf(next.id) === -1 &&
                    inIDs.indexOf(next.id) === -1) {
                    this.input.push(next);
                }
            });
        }
        if (outi !== -1) {
            layer.prev.forEach(prev => {
                if (prev.next.length === 0 &&
                    outIDs.indexOf(prev.id) === -1 &&
                    inIDs.indexOf(prev.id) === -1) {
                    this.output.push(prev);
                }
            });
        }
    }

    connect(prev, next) {
        prev.addNext(next);
        next.addPrev(prev);
        if (this.causesCycle(prev.id, next)) {
            this.disconnect(prev, next);
        }
    }

    disconnect(prev, next) {
        prev.next.filter(item => item.id !== next.id);
        next.prev.filter(item => item.id !== prev.id);
    }

    causesCycle(id, item) {
        if (item.id === id) {
            return true;
        }
        for (let i = 0; i < item.next.length; i++) {
            if (this.causesCycle(id, item.next[i])) {
                return true;
            }
        }
        return false;
    }

    addInput(layer) {
        this.input.push(layer);
    }

    addOutput(layer) {
        this.output.push(layer);
    }

    makeOutput(layerNum) {
        const inIDs = [...(this.input).id];
        const ini = inIDs.indexOf(this.layers[layerNum].id);
        if (this.layers[layerNum].next.length === 0 &&
            ini === -1) {
            this.output.push(this.layers[layerNum]);
        }
    }

    outNotMax(max) {
        let toRet = false;
        this.layers.forEach(layer => {
            if (!toRet) {
                if (layer.maxDist > max) {
                    toRet = true;
                }
                if (layer.maxDist === max) {
                    if (!toRet) {
                        let match = false;
                        this.output.forEach(out => {
                            if (layer.id === out.id) {
                                match = true;
                            }
                        });
                        if (!match) {
                            toRet = true;
                        }
                    }
                }
            }
        });
        return toRet;
    }

    render() {
        this.renderOrder = [];

        this.layers.forEach(i => {
            i.maxDist = 0;
        });

        let max = 0;

        this.input.forEach(i => {
            let temp = i.reach(0);
            if (temp > max) {
                max = temp;
            }
        });

        for (let i = 0; i <= max; i++) {
            this.renderOrder.push([]);
        }

        const outputNM = this.outNotMax(max);
        this.output.forEach(i => {
            i.maxDist = max;
            if (outputNM) {
                i.maxDist += 1;
            }
        });
        if (outputNM) {
            this.renderOrder.push([]);
        }

        this.layers.forEach(i => {
            this.renderOrder[i.maxDist].push(i);
        });
    }
}