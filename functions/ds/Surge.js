const ini = require('ini');

class Names {
  constructor(names, Proxy) {
    this.names = names;
    this.Proxy = Proxy;
  }

  generate() {
    let result = '';
    for (let name of names) {
      result += `${name} = ${this.Proxy[name]}\n`
    }
    return result;
  }

  filter(keyword) {
    const names = [];
    for (let name of this.names) {
      if (name.indexOf(keyword) !== -1) {
        names.push(name);
      }
    }

    return Names(names, this.Proxy);
  }

  filterURL(keyword) {
    const names = [];
    for (let name of this.names) {
      const splitResult = this.Proxy[name].split(',');
      const url = splitResult[1].trim();
      if (url.indexOf(keyword) !== -1) {
        names.push(name);
      }
    }

    return Names(names, this.Proxy);
  }
}

class Surge {
  constructor(profile) {
    const config = ini.parse(profile);
    const { Proxy } = config;
    // console.log(Proxy);
    // console.log(Object.keys(Proxy));
    this.Proxy = Proxy;
  }

  list() {
    return new Names(Object.keys(this.Proxy), this.Proxy)
  }

  preset(presetName) {
    return this.list().generate();
  }

}

module.exports = Surge;