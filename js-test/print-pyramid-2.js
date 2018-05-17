const space = function(spc) {
  if (spc === 0) {
    return "";
  }
  return " " + space(spc - 1);
};
const star = function(str) {
  if (str === 0) {
    return "";
  }
  return "*" + star(str - 1);
};
const run = function(n, spc, str) {
  if (n === 0) {
    return " ";
  }
  console.log(space(spc) + star(str));
  run(n - 1, spc - 1, str + 2);
};
const trianglestars = function(n) {
  run(n, n - 1, 1);
};
trianglestars(5);
