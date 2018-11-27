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
        return this[functionName](args);;
    }
};

myObject.addPrototype = function (parent) {
    if(this.checkParentTree(parent) || parent.checkParentTree(this)){
        console.log("Cant add idiot");
    } else {
        console.log("inne i else");
        if(this.prototypeList === null){
            this.prototypeList = [];
        }
        console.log(this.prototypeList);
        this.prototypeList.push(parent);
        console.log(this.prototypeList);
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


//Testpart 1
var obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
var obj1 = myObject.create([obj0]);
var obj2 = myObject.create([]);
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2]);
var result = obj3.call("func", ["hello"])  ;
console.log("should print ’func0: hello’ ->", result);

result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

//Tast Part 2
//var obj0 = myObject.create(null);
//var obj1 = myObject.create([obj0]);
var obj4 = myObject.create([obj1]);

obj0.addPrototype(obj1);
obj4.addPrototype(obj3);