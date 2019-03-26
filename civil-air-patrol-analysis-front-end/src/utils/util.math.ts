export class MathUtil{

  /*
   *
   * Does math on a number and rounds it to the ones place.
   * 
   * @param  {primary:number}   The primary number to divide.
   * @param  {by:number}        The number to divide by.
   * 
   * @return {number}           The result of the division with rounded.          
   * 
   */

  public static divide_by_and_rnd(primary: number ,by: number){

    return Math.round(primary / by);

  }

}