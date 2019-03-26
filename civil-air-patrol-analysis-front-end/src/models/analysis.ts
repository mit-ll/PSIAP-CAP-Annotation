/*
 *
 *  Analysis object.
 * 
 */

import { Class } from '../models/class';

export class Analysis {
    user_name: string;
    file_name: string;
    sec_num: number;
    created_date: Date;
    classes: Array<Class>;
}