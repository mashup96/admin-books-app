// function that allows you to create a reducer without a switch case
export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
      } else {
        return state;
      }
    }
}

// function used to change the status of a reducer
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// function to extract data from firebase response
export const getElementsFromDocs = (querySnapshot) => {
    let elements = [];
    querySnapshot.forEach(function(doc) {     
        elements.push({...doc.data(), id: doc.id});
    });
    return elements;
}


// function check if a string contains another string inside
export const containsValue = (value,valueToCheck) => {    
   const val = String(value).toUpperCase();
   const valToCheck =  String(valueToCheck).toUpperCase();   
   return val.includes(valToCheck);
}

// function for pagination
export const getPartialList = (currentPage,pageSize,elements) => {
    return elements.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
      );                
}

// function for alphabetical sorting
export function sortAlphabetically(elements,sortProperty,typeSort){
    elements.sort(function(prevObject, nextObject){
        const prev = prevObject[sortProperty].toLowerCase();
        const next = nextObject[sortProperty].toLowerCase();
        if (prev > next){
            return 1;
        }
        else if (prev < next){
            return -1;
        }
        else {
             return 0;
        }        
    });
    if(typeSort === "DESC"){
       elements.reverse(); 
    }
    return elements;
}

// function for numerical ordering
export function sortByNumber(elements,sortProperty,typeSort){
    elements.sort(function(prevObject, nextObject){
        const prev = prevObject[sortProperty];
        const next = nextObject[sortProperty];
        return prev - next;
    });
    if(typeSort === "DESC"){
        elements.reverse(); 
     }
    return elements;
}