function createClass(className, superClassList) {
    myClass = {
        name: className,
        superList: superClassList,
        new: function () {
            o = {};
            o.class = this;
            o.call = function (funcName, parameters) {
                if (!(typeof this[funcName] === 'function')) {
                    return this.class.lookUp(funcName, parameters);
                } else {
                    return this[funcName].apply(null, parameters);
                }

            };
            return o;
        },
        //TODO kanske kolla om vi kan förändra scope till Class.lookup()
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
                return this[funcName].apply(null, parameters);
            }
        }

    };
    return myClass;
}

var class0 = createClass("Class0", null);
class0.func = function (arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function (arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);

console.log(result);