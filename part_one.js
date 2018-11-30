/**
 * Assignment1 Grupp 49
 * Erik Lavfors - erla5605@student.su.se
 * Daniel Andersson - daan3440@student.su.se
 */
var myObject = {
};

myObject.create = function (prototypeList) {
    o = {};
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
