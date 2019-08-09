// https://constraints.cs.washington.edu/solvers/cassowary-tochi.pdf
// https://github.com/slightlyoff/cassowary.js 

var c = require("cassowary");

var solver = new c.SimplexSolver();

// Variable

var consTen = new c.Variable({ value: 10 });
var consTwenty = new c.Variable({ value: 20 });
var consThirty = new c.Variable({ value: 30 });

var pLeft = new c.Variable({ value: 0 });
var pRight = new c.Variable({ value: 80 });
var pWidth = new c.Variable({ value: 80 });

var aLeft = new c.Variable({ value: 10 });
var aRight = new c.Variable({ value: 30 });
var aWidth = new c.Variable({ value: 20 });

var bLeft = new c.Variable({ value: 40 });
var bRight = new c.Variable({ value: 70 });
var bWidth = new c.Variable({ value: 30 });

// Expression

var tenEx = new c.Expression(consTen);
var twentyEx = new c.Expression(consTwenty);
var thirtyEx = new c.Expression(consThirty);

var pLeftEx = new c.Expression(pLeft);
var pRightEx = new c.Expression(pRight);
var pWidthEx = new c.Expression(pWidth);

var aLeftEx = new c.Expression(aLeft);
var aRightEx = new c.Expression(aRight);
var aWidthEx = new c.Expression(aWidth);

var bLeftEx = new c.Expression(bLeft);
var bRightEx = new c.Expression(bRight);
var bWidthEx = new c.Expression(bWidth);

// Equation

// -10 - p.left + a.left >= 0 | 10 ≤ a.left - p.left 
var w1Eq = new c.Inequality(aLeftEx.minus(pLeftEx).minus(tenEx));
// 10 + p.left - a.left >= 0 | a.left - p.left ≤ 10
var w2Eq = new c.Inequality(tenEx.plus(pLeftEx).minus(aLeftEx));
// -10 - a.right + b.left >= 0 | 10 ≤ b.left - a.right
var w3Eq = new c.Inequality(bLeftEx.minus(aRightEx).minus(tenEx));
// 10 + a.right - b.left >= 0 | b.left - a.right ≤ 10
var w4Eq = new c.Inequality(tenEx.minus(bLeftEx).plus(aRightEx));
// -10 + p.right - b.right >= 0 | 10 ≤ p.right - b.right
var w5Eq = new c.Inequality(pRightEx.minus(bRightEx).minus(tenEx));
// 10 - p.right + b.right >= 0 | p.right - b.right ≤ 10
var w6Eq = new c.Inequality(tenEx.minus(pRightEx).plus(bRightEx));
// -20 + a.width >= 0 | 20 ≤ a.width 
var w7Eq = new c.Inequality(aWidthEx.minus(twentyEx));
// 20 - a.width >= 0 | a.width ≤ 20
var w8Eq = new c.Inequality(twentyEx.minus(aWidthEx));
// -30 + b.width >= 0 | 30 ≤ b.width
var w9Eq = new c.Inequality(bWidthEx.minus(thirtyEx));
// 30 - b.width >= 0 | b.width ≤ 30
var w10Eq = new c.Inequality(thirtyEx.minus(bWidthEx));

solver.addConstraint(w1Eq);
solver.addConstraint(w2Eq);
solver.addConstraint(w3Eq);
solver.addConstraint(w4Eq);
solver.addConstraint(w5Eq);
solver.addConstraint(w6Eq);
solver.addConstraint(w7Eq);
solver.addConstraint(w8Eq);
solver.addConstraint(w9Eq);
solver.addConstraint(w10Eq);

solver.solve();

// JavaScript logger 

// console.log(solver);

console.log("ten "+consTen.toString());
console.log("twenty "+consTwenty.toString());
console.log("thirty "+consThirty.toString());

console.log("p.left "+pLeft.toString());
// console.log(pLeftEx.toString());
console.log("p.right "+pRight.toString());
// console.log(pRightEx.toString());
console.log("p.width "+pWidth.toString());
// console.log(pWidthEx.toString());

console.log("a.left "+aLeft.toString());
// console.log(aLeftEx.toString());
console.log("a.right "+aRight.toString());
// console.log(aRightEx.toString());
console.log("a.width "+aWidth.toString());
// console.log(aWidthEx.toString()); 

console.log("b.left "+bLeft.toString());
// console.log(bLeftEx.toString());
console.log("b.right "+bRight.toString());
// console.log(bRightEx.toString());
console.log("b.width "+bWidth.toString());
// console.log(bWidthEx.toString()); 

console.log("10 ≤ a.left - p.left "+w1Eq.toString()); 
console.log("a.left - p.left ≤ 10 "+w2Eq.toString()); 
console.log("10 ≤ b.left - a.right "+w3Eq.toString()); 
console.log("b.left - a.right ≤ 10 "+w4Eq.toString());  
console.log("10 ≤ p.right - b.right "+w5Eq.toString());  
console.log("p.right - b.right ≤ 10 "+w6Eq.toString()); 
console.log("20 ≤ a.width "+w7Eq.toString());  
console.log("a.width ≤ 20 "+w8Eq.toString()); 
console.log("30 ≤ b.width "+w9Eq.toString());  
console.log("b.width ≤ 30 "+w10Eq.toString());  
