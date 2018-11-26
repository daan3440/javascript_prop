
var myObject = {
};

myObject.create = function (prototypeList, name) {
    o = {};
    o.name = name;
    o.prototypeList = prototypeList;
    //o.call = this.call;
    //o.create = this.create;
    //o.findFunction = this.findFunction;
    o.__proto__ = this;
    return o;
};

myObject.call = function (functionName, args) {
    if (!(typeof this[functionName] === 'function')) {
        if (this.prototypeList !== null) {
            for (i = 0; i < this.prototypeList.length; i++) {
                return this.prototypeList[i].call(functionName, args);
            }
        }
    } else {
        return this[functionName].apply(this[functionName], args);
       // return this[functionName](args);
    }
};

myObject.addPrototype = function (parent) {
    if(parent.checkParentTree(this)){
        console.log("Cant add idiot");
    } else {
        console.log("inne i else");
        if(this.prototypeList === null){
            this.prototypeList = [];
        }
        this.prototypeList.push(parent);
    }
};

myObject.checkParentTree = function (wantedParent) {
    parentFound = false;
    if (this.prototypeList !== null) {
        for (i = 0; i < this.prototypeList.length; i++) {
            if (wantedParent == this.prototypeList[i]) {
                return true;
            } else {
                parentFound = this.prototypeList[i].checkParentTree(wantedParent);
                if (parentFound) {
                    return true;
                }
            }
        }
    } 
    return false;
};

var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func0: hello’ ->", result);

var obj0 = myObject.create(null, "obj0");
var obj1 = myObject.create([obj0], "obj1");
var obj3 = myObject.create([obj1], "obj3");
var obj4 = myObject.create([obj1, obj3], "obj4");
var obj5 = myObject.create([obj3],"obj5");
var obj2 = myObject.create([obj0, obj5],"obj2");

obj3.addPrototype(obj2);
obj5.addPrototype(obj4);

console.log(obj2);
console.log(obj5);
