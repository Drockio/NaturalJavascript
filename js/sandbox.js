//Notes from Graph Theory video
//https://www.freecodecamp.org/news/learn-graph-theory-algorithms-from-a-google-engineer/?fbclid=IwAR2QN9svUMvX26VVbJ-euBcyWjyyQPtafhh38U7ALoHQxPmMtX8TfzEERv8

// Complete Graph - best way to test a graph because all points connect. 
// Connectivity - union find data structure (or Depth first search or Breadth first search)

// Depth First Search - explore a path until you hit a dead end
// 27:18 in video
// 32:00  different one?
// Generatre mazes?

// Bredth First Search - explore all neightbors of a node while keeping track of which notde tocheck next
// 38:00 in video

// Adjacency list/matrix construction: 42:00
// needed for previous examples


//Sets cannot contain duplicate items
class Set {
	constructor() {
		this.collection = [];
	}
	print() {
		return this.collection;
	}
	// this method will check for the presence of an element and return true or false
	has(element) {
		return this.collection.includes(element);

		//alt-syntax: //return this.collection.indexOf(element) !== -1;
	}
	// this method will return all the values in the set
	values() {
		return this.collection;
	}
	add(item) {
		if (!this.has(item)) {
			this.collection.push(item);
			return true;
		}
		return false;
	}
	remove(element) {
		let index = this.collection.indexOf(element);
		if (index !== -1) {
			this.collection.splice(index, 1);
		}
	}
	size() {
		return this.collection.length;
	}
}


//FIFO/LILO Front of queue is collection[0];
// myQueue.enqueue(['parrot', 2]);
// myQueue.enqueue(['human', 3]);
// myQueue.printCollection();
function PriorityQueue() {
	let collection = [];
	this.printCollection = function () {
		console.log(collection);
	};

	//this is the key to Priority Queue. Enqueue in the right position
	//and it becomes a "normal queue"
	this.enqueue = function (node) {
		if (collection.length === 0) {
			collection.push(node);
		} else {
			let enqueuePriority = node[1];
			let position = 0;
			for (let item in collection) {
				if (collection.hasOwnProperty(item)){
					let currentCollectionPriority = collection[position][1];
					if (enqueuePriority < currentCollectionPriority) {
						return collection.splice(position, 0, node);
					}
					position++;
					}
			}
			collection.push(node);
		}
	};
	this.dequeue = function (item) {
		return collection.shift();
	};
	this.front = function () {
		return collection[0];
	};
	this.size = function () {
		return collection.length;
	};
	this.isEmpty = function () {
		return collection.length === 0;
	};
}

//Last in first out. (Depth-First Search?)
function Stack() {
	var collection = [];
	this.print = function () {
		console.log(collection);
	};

	this.push = function (item) {
		return collection.push(item);
	};

	this.pop = function (item) { 
		return collection.pop();
	};

	this.peek = function (item) {
		return collection[collection.length - 1];
	};

	this.isEmpty = function () {
		return collection.length === 0;
	};

	this.clear = function () {
		collection.length = 0;
	};
}

function reverseString(string) {
	let newString = "";
	for (let i = string.length - 1; i >= 0; i--) {
		newString += string[i];
	}
	return newString;
}
function reverseStringRecursive(str) {
	if (str === "") {
		return str;
	} else {
		let temp = str.substring(1);
		console.log(temp + ' | ' + str.charAt(0));
		return reverseStringRecursive(temp) + str.charAt(0);
	}
}

//other names: hash, hash map, map, unordered map, dictionary
function HashTable(object) {
	this.items = {};
	this.length = 0;
	for (let property in object) {
		if (object.hasOwnProperty(property)) {
			this.items[property] = object[property];
			this.length++;
		}
	}
}

function swap(a, b, array) {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

//ex call: bubbleSort([92, 1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
function bubbleSort(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - 1 - i; j++) {
			console.log(array[i] + ' | ' + array[j]);
			if (array[j] > array[j + 1]) {
				swap(j, j + 1, array);
			}
		}
	}
	console.log(array);
}