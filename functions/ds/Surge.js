const ini = require('ini');

class Surge {
  constructor(profile) {
    const config = ini.parse(profile);
    const { Proxy } = config;
    // console.log(Proxy);
    // console.log(Object.keys(Proxy));
    this.Proxy = Proxy;
  }

  generate(names) {
    let result = '';
    for (let name of names) {
      result += `${name} = ${this.Proxy[name]}\n`
    }
    return result;
  }

  list() {
    return this.generate(Object.keys(this.Proxy));
  }

  filter(keyword) {
    const names = [];
    for (let name in this.Proxy) {
      if (name.indexOf(keyword) !== -1) {
        names.push(name);
      }
    }

    return this.generate(names);
  }

  filterURL(keyword) {
    const names = [];
    for (let name in this.Proxy) {
      const splitResult = this.Proxy[name].split(',');
      const url = splitResult[1].trim();
      if (url.indexOf(keyword) !== -1) {
        names.push(name);
      }
    }

    return this.generate(names);
  }
}

module.exports = Surge;