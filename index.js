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