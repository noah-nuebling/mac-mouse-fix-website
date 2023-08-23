
/*   
  Easing for gsap that feels like critically damped spring. 
  This is just a string, so having it in a js function is probably not the best idea 
  */

export default () => {
  return "elastic.out(0.001, 1.0)"
}