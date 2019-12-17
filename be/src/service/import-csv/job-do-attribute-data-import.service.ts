import {Job} from "../../model/job.model";
import {Attribute} from "../../model/attribute.model";
import {JobLogger, newJobLogger, newLoggingCallback} from "../job-log.service";
import {saveAttributes} from "../attribute.service";
import {getJobyById} from "../job.service";
import {doInDbConnection, QueryA, QueryResponse} from "../../db";
import {PoolConnection} from "mariadb";

const uuid = require('uuid');


export const runJob = async (viewId: number, attributeDataImportId: number, attributes: Attribute[]): Promise<Job> => {

    const uid = uuid();
    const name: string = `attribute-data-import-job-${uid}`;
    const description: string = `attribute-data-import-job-${uid} description`;

    const jobLogger: JobLogger = await newJobLogger(name, description);

    (async ()=> {
        try {
            const effectiveAttributes: Attribute[] = [];

            for (const a of attributes) {
                await doInDbConnection(async (conn: PoolConnection) => {
                    const q: QueryA = await conn.query(
                        `SELECT COUNT(*) AS COUNT FROM TBL_VIEW_ATTRIBUTE WHERE NAME=? AND VIEW_ID=?`, [a.name, viewId]);
                    if (q.length > 0 && q[0].COUNT > 0) {
                        jobLogger.logWarn(`attribute with name ${a.name} already exists in view ${viewId}, it cannot be created`);
                    } else {
                        effectiveAttributes.push(a);
                    }
                });
            }
            await saveAttributes(viewId, effectiveAttributes, newLoggingCallback(jobLogger));
            await jobLogger.updateProgress("COMPLETED");
        } catch(e) {
            await jobLogger.updateProgress("FAILED");
        }
    })();

    return await getJobyById(jobLogger.jobId);
}
