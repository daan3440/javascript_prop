/**
 * Assignment1 Grupp 49
 * Erik Lavfors - erla5605@student.su.se
 * Daniel Andersson - daan3440@student.su.se
 */
function createClass(className, superClassList) {
    myClass = {
        name: className,
        superList: superClassList,
        new: function () {
            o = {};
            o.class = this;
            o.call = function (funcName, parameters) {
                let result = this.lookUp(funcName, parameters);
                if (result === undefined) {
                    console.log("Error, no function with the name " + functionName);
                } else {
                    return result[0];
                }
            }
            o.lookUp = function (funcName, parameters) {
                if (!(typeof this[funcName] === 'function')) {
                    return this.class.lookUp(funcName, parameters);
                } else {
                    return [this[funcName].apply(null, parameters)];
                }
            };
            return o;
        },
        lookUp: function (funcName, parameters) {
            if (!(typeof this[funcName] === 'function')) {
                if (this.superList !== null) {
                    for (var i = 0; i < this.superList.length; i++) {
                        var result = this.superList[i].lookUp(funcName, parameters);
                        if (result != undefined) {
                            return result;
                        }
                    }
                }
            } else {
                return [this[funcName].apply(null, parameters)];
            }
        },
        addSuperClass: function (makeSuperClass) {
            if (makeSuperClass === this || makeSuperClass.checkNoneValidSuperClass(this)) {
                console.log("Error: invalid superClass, circular inheritance detected.");
            } else {
                if (this.superList === null) {
                    this.superList = [];
                }
                if (!this.superList.includes(makeSuperClass)) {
                    this.superList.push(makeSuperClass);
                }
            }
        },
        checkNoneValidSuperClass: function (possibleChildClass) {
            if (this.superList !== null) {
                for (let i = 0; i < this.superList.length; i++) {
                    if (this.superList[i] === possibleChildClass) {
                        return true;
                    } else {
                        if (this.superList[i].checkNoneValidSuperClass(possibleChildClass)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
    };
    return myClass;
}
