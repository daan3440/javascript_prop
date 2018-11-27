
var myObject = {
};

myObject.create = function (prototypeList, name) {
    o = {};
    o.name = name;
    o.prototypeList = prototypeList;
    //o.call = this.call;
    //o.create = this.create;
    o.__proto__ = this;
    return o;
};

myObject.call = function (functionName, args) {
    if (!(typeof this[functionName] === 'function')) {
        if (this.prototypeList !== null) {
            for (let i = 0; i < this.prototypeList.length; i++) {
                let result = this.prototypeList[i].call(functionName, args);
                if(result != undefined){
                    return result;
                }   
            }
        }
    } else {
        return this[functionName].apply(null, args);
    }
};

myObject.addPrototype = function (wantedParent) {
    if(wantedParent.checkInheritanceTreeForChild(this)){
        console.log("Error: Circular Inheritance not allowed!");
    } else {
        if(this.prototypeList === null){
            this.prototypeList = [];
        }
        if(!this.prototypeList.includes(wantedParent)){
            this.prototypeList.push(wantedParent);
        }
    }
};

myObject.checkInheritanceTreeForChild = function (potentialChild) {
    if (this.prototypeList !== null) {
        for (let i = 0; i < this.prototypeList.length; i++) {
            if (potentialChild === this.prototypeList[i]) {
                return true;
            } else {
                parentFound = this.prototypeList[i].checkInheritanceTreeForChild(potentialChild);
                if (parentFound) {
                    return true;
                }
            }
        }
    } 
    return false;
};

var obj0 = myObject.create(null, "obj0");
obj0.func = function(arg, args) { return "func0: " + arg; };
var obj1 = myObject.create([obj0], "obj1");
var obj2 = myObject.create([], "obj2");
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2], "obj3");
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func0: hello’ ->", result);


// var obj0 = myObject.create(null, "obj0");
// var obj1 = myObject.create([obj0], "obj1");
// var obj3 = myObject.create([obj1], "obj3");
// var obj4 = myObject.create([obj1, obj3], "obj4");
// var obj5 = myObject.create([obj3],"obj5");
// var obj2 = myObject.create([obj0, obj5],"obj2");

// obj3.addPrototype(obj2);

// obj3.addPrototype(obj1);

// obj5.addPrototype(obj4);

// console.log(obj2);
// console.log(obj5);
// console.log(obj3);
