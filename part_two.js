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

//check 1
var class0 = createClass("Class0", null);
class0.func = function (arg) { return "func0: " + arg; };
var class1 = createClass("Class1", [class0]);
var class2 = createClass("Class2", []);
class2.func = function (arg) { return "func2: " + arg; };
var class3 = createClass("Class3", [class1, class2]);
var obj3 = class3.new();
var result = obj3.call("func", ["hello"]);
console.log(result);
//Check 2
class0 = createClass("Class0", null);
class0.func = function (arg) { return "func0: " + arg; };
class1 = createClass("Class1", [class0]);
class2 = createClass("Class2", []);
class3 = createClass("Class3", [class2, class1]);
obj3 = class3.new();
result = obj3.call("func", ["hello"]);
console.log(result);
//check 3
class0 = createClass("Class0", null);
class0.func = function (arg) { return "func0: " + arg; };
var obj0 = class0.new();
result = obj0.call("func", ["hello"]);
console.log(result);

//Check Circualar Prevention
var class0 = createClass("Class 0", null);
var class1 = createClass("Class 1", [class0]);
class0.addSuperClass(class1);
class0.addSuperClass(class0);



//Egna tester
// var class0 = createClass("Class0", null);
// class0.func = function (arg) { return "func0: " + arg; };
// var class1 = createClass("Class1", [class0]);
// var class2 = createClass("Class2", []);
// class2.func = function (arg) { return "func2: " + arg; };
// var class3 = createClass("Class3", [class1, class2]);
// var class4 = createClass("Class3", null);
// var obj3 = class3.new();
// var result = obj3.call("func", ["hello"]);

// console.log(result);
// console.log("class4 + class1");
// class4.addSuperClass(class1);
// console.log("class1 + class0");
// class1.addSuperClass(class0);

// console.log(class1 );
// console.log("class0 + class1: fail" );

// class0.addSuperClass(class1);
