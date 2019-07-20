const ini = require('ini');

class Names {
  constructor(names, Proxy) {
    this.names = names;
    this.Proxy = Proxy;
  }

  generate() {
    let result = '';
    for (let name of this.names) {
      result += `${name} = ${this.Proxy[name]}\n`
    }
    return result;
  }

  filter(keyword) {
    const keywords = keyword.split('+');
    const names = this.names.filter(name => {
      for (const kw of keywords) {
        if (name.indexOf(kw) !== -1) {
          return true;
        }
      }
    })

    return new Names(names, this.Proxy);
  }

  filterURL(keyword) {
    const keywords = keyword.split('+');
    const names = this.names.filter(name => {
      const splitResult = this.Proxy[name].split(',');
      const url = splitResult[1].trim();

      for (const kw of keywords) {
        if (url.indexOf(kw) !== -1) {
          return true;
        }
      }
    })

    return new Names(names, this.Proxy);
  }

  static join(...exists) {
    const names = [];
    const set = new Set();
    for (const exist of exists) {
      exist.names.map(name => {
        if (!set.has(name)) {
          names.push(name);
          set.add(name);
        }
      })
    }

    return new Names(names, exists[0].Proxy);
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
    return new Names(Object.keys(this.Proxy), this.Proxy);
  }

  preset(presetName) {
    if (presetName === 'netflix') {
      // default: HK+MO+TW
      return this.list().filter('HKT+HKBN+CTM+江苏中转+HINET').generate();
    } else if (presetName === 'netflix_hk') {
      return this.list().filter('HKT+HKBN').generate();
    } else if (presetName === 'netflix_mo') {
      return this.list().filter('CTM+江苏中转').generate();
    } else if (presetName === 'netflix_tw') {
      return this.list().filter('HINET').generate();
    } else if (presetName === 'netflix_jp') {
      return this.list().filter('IDCF+软银').generate();
    } else if (presetName === 'netflix_us') {
      return this.list().filter('美国').filter('CN2').generate();
    } else if (presetName === 'netflix_iplc') {
      const listBase = this.list().filter('IPLC');
      return Names.join(listBase.filter('深港+沪港'), listBase.filterURL('hanggang.001+hanggang.002')).generate();
    }

    return this.list().generate();
  }

}

module.exports = Surge;