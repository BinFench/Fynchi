var __count = 0;

export default class Layer {
    constructor(config) {
        this.config = config;
        this.prev = [];
        this.next = [];
        this.id = __count++;
        this.maxDist = 0;
        this.renderOptions = false;
    }

    addPrev(layer) {
        const ids = this.prev.map(el => el.id);
        if (ids.indexOf(layer.id) === -1) {
            this.prev.push(layer);
        }
    }

    addNext(layer) {
        const ids = this.next.map(el => el.id);
        if (ids.indexOf(layer.id) === -1) {
            this.next.push(layer);
        }
    }

    reach(dist) {
        if (dist > this.maxDist || this.maxDist === 0) {
            this.maxDist = dist;
            let max = dist;
            this.next.forEach(i => {
                let temp = i.reach(dist + 1);
                if (temp > max) {
                    max = temp;
                }
            });
            return max;
        }
        return dist;
    }
}