export class ResponseUtil{

  //  Status codes.
  private static readonly OK: number = 200;
  private static readonly CREATED: number = 201;

  /*
   *
   * Checks the status of the response code.
   * 
   * @param  {status:number}    The response status code to check.
   * 
   * @return {boolean}          True if status code is ok.          
   * 
   */

  public static response_status_check(status: number){

    return status === this.OK || status === this.CREATED;

  }

}