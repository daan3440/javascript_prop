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
        },
        addSuperClass: function (makeSuperClass) {
            if (makeSuperClass.checkNoneValidSuperClass(this)) {
                console.log("Error: invalid superClass, circular inheritance detected.");
            } else {
                if (this.superList === null) {
                    this.superList = [];
                }
                if (!this.superList.includes(makeSuperClass)){ 
                this.superList.push(makeSuperClass);
            }
        }

    },
        checkNoneValidSuperClass: function (possibleChildClass) {
            // superClassFound = false;
            if (this.superList !== null) {
                for (let i = 0; i < this.superList.length; i++) {
                    if (this.superList[i] === possibleChildClass) {
                        return true;
                    } else {
                        // superClassFound = this.superList[i].checkNoneValidSuperClass(possibleSuperclass);
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

var class0 = createClass("Class0", null);
class0.func = function (arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function (arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var class4 = createClass("Class3", null);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);

console.log(result);
console.log("class4 + class1");
class4.addSuperClass(class1);
console.log("class1 + class0");
class1.addSuperClass(class0);

console.log(class1 );
console.log("class0 + class1: fail" );
class0.addSuperClass(class1);