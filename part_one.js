var myObject = {
};

myObject.create = function (prototypeList, name) {
    o = {};
    o.name = name;
    o.prototypeList = prototypeList;
    o.__proto__ = this;
    return o;
};

myObject.call = function(functionName, args) {
	let result = this.lookUp(functionName, args);
	if(result === undefined){
		console.log("Error, no function with the name " + functionName);
	} else {
		return result[0];
	}		
}

myObject.lookUp = function (functionName, args) {
    if (!(typeof this[functionName] === 'function')) {
        if (this.prototypeList !== null) {
            for (let i = 0; i < this.prototypeList.length; i++) {
                let result = this.prototypeList[i].lookUp(functionName, args);
                if(result != undefined){
                    return result;
                }   
            }
        }
    } else {
        return [this[functionName].apply(null, args)];
    }
};

myObject.addPrototype = function (wantedParent) {
    if(wantedParent === this || wantedParent.checkInheritanceTreeForChild(this)){
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

//check 1
var obj0 = myObject.create(null, "obj0");
obj0.func = function(arg, args) { return "func0: " + arg; };
var obj1 = myObject.create([obj0], "obj1");
var obj2 = myObject.create([], "obj2");
obj2.func = function(arg) { return "func2: " + arg; };
var obj3 = myObject.create([obj1, obj2], "obj3");
var result = obj3.call("func", ["hello"]) ;
console.log("should print ’func0: hello’ ->", result);

//check 2
obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
obj1 = myObject.create([obj0]);
obj2 = myObject.create([]);
obj3 = myObject.create([obj2, obj1]);
result = obj3.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);
//Check 3
obj0 = myObject.create(null);
obj0.func = function(arg) { return "func0: " + arg; };
result = obj0.call("func", ["hello"]);
console.log("should print ’func0: hello’ ->", result);

//check circular prevention
var obj0 = myObject.create(null);
var obj1 = myObject.create([obj0]);
obj0.addPrototype(obj1);

//egna tester
// var obj0 = myObject.create(null, "obj0");
// var obj1 = myObject.create([obj0], "obj1");
// var obj3 = myObject.create([obj1], "obj3");
// var obj4 = myObject.create([obj1, obj3], "obj4");
// var obj5 = myObject.create([obj3],"obj5");
// var obj6 = myObject.create([obj0, obj5],"obj6");
// var obj2 = myObject.create([obj0, obj5],"obj2b");

// obj3.addPrototype(obj2);
// obj3.addPrototype(obj1);
// obj5.addPrototype(obj4);

// console.log(obj2);
// console.log(obj5);
// console.log(obj3);
// console.log(obj6);
