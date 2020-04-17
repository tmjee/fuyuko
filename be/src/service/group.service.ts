import {Group} from "../model/group.model";
import {doInDbConnection, QueryA, QueryI} from "../db";
import {Connection} from "mariadb";
import {Role} from "../model/role.model";

export const searchForGroupsWithNoSuchRoleCount = async (roleName: string, groupName?: string): Promise<number> => {
    return await doInDbConnection(async (conn: Connection) => {

        const qTotal: QueryA = await conn.query(`
                SELECT 
                    COUNT(*) AS COUNT
                FROM TBL_GROUP AS G
                WHERE G.STATUS = 'ENABLED'
                AND G.ID NOT IN (
                    SELECT 
                        G.ID
                     FROM TBL_GROUP AS G
                     LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                     LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                     WHERE R.NAME = ? 
                ) AND G.NAME LIKE ?
            `, [roleName, `%${groupName ? groupName : ''}%`]);
        return qTotal;
    });
};

export const searchForGroupsWithNoSuchRole = async (roleName: string, groupName?: string): Promise<Group[]> => {
    return await doInDbConnection(async (conn: Connection) => {
        const q: QueryA = await conn.query(`
                SELECT 
                    G.ID AS G_ID,
                    G.NAME AS G_NAME,
                    G.DESCRIPTION AS G_DESCRIPTION,
                    G.STATUS AS G_STATUS,
                    R.ID AS R_ID,
                    R.NAME AS R_NAME,
                    R.DESCRIPTION AS R_DESCRIPTION
                FROM TBL_GROUP AS G
                LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                WHERE G.STATUS = 'ENABLED' 
                AND G.ID NOT IN (
                    SELECT 
                        G.ID
                     FROM TBL_GROUP AS G
                     LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                     LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                     WHERE R.NAME = ? 
                ) AND G.NAME LIKE ?
            `, [roleName, `%${groupName ? groupName : ''}%`]);
        const m: Map<number/*groupId*/, Group> = new Map();
        const groups: Group[] = q.reduce((groups: Group[], c: QueryI) => {
            const groupId: number = c.G_ID;
            const groupName: string = c.G_NAME;
            const groupDescription: string = c.G_DESCRIPTION;
            const groupStatus: string = c.G_STATUS;
            if (!m.has(groupId)) {
                const g: Group = {
                    id: groupId,
                    name: groupName,
                    description: groupDescription,
                    status: groupStatus,
                    roles: []
                } as Group;
                groups.push(g);
                m.set(groupId, g);
            }
            const g: Group = m.get(groupId);
            const roleId: number = c.R_ID;
            const roleName: string = c.R_NAME;
            const roleDescription: string = c.R_DESCRIPTION;
            g.roles.push({
                id: roleId,
                name: roleName,
                description: roleDescription
            } as Role);
            return groups;
        }, []);
        return groups;
    });
};

export const searchForGroupByName = async (groupName: string): Promise<Group[]> => {
        return await doInDbConnection(async (conn: Connection) => {
        const q: QueryA = await conn.query(`
                SELECT 
                    G.ID AS G_ID,
                    G.NAME AS G_NAME,
                    G.DESCRIPTION AS G_DESCRIPTION,
                    G.STATUS AS G_STATUS,
                    R.ID AS R_ID,
                    R.NAME AS R_NAME,
                    R.DESCRIPTION AS R_DESCRIPTION
                FROM TBL_GROUP AS G
                LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                WHERE G.STATUS = 'ENABLED' AND G.NAME LIKE ? LIMIT 10 OFFSET 0
            `, [`%${groupName}%`]);
        const m: Map<number/*groupId*/, Group> = new Map();
        const groups: Group[] = q.reduce((groups: Group[], c: QueryI) => {
            const groupId: number = c.G_ID;
            const groupName: string = c.G_NAME;
            const groupDescription: string = c.G_DESCRIPTION;
            const groupStatus: string = c.G_STATUS;
            if (!m.has(groupId)) {
                const g: Group = {
                    id: groupId,
                    name: groupName,
                    description: groupDescription,
                    status: groupStatus,
                    roles: []
                } as Group;
                groups.push(g);
                m.set(groupId, g);
            }
            const g: Group = m.get(groupId);
            const roleId: number = c.R_ID;
            const roleName: string = c.R_NAME;
            const roleDescription: string = c.R_DESCRIPTION;
            g.roles.push({
                id: roleId,
                name: roleName,
                description: roleDescription
            } as Role);
            return groups;
        }, []);
        return groups;
    });
};

export const getGroupsWithRoleCount = async (roleName: string): Promise<number> => {
    return await doInDbConnection(async (conn: Connection) => {
        const qTotal: QueryA = await conn.query(`
                SELECT 
                    COUNT(*) AS COUNT
                FROM TBL_GROUP AS G
                WHERE G.STATUS = 'ENABLED'
                AND G.ID IN (
                    SELECT 
                        G.ID
                     FROM TBL_GROUP AS G
                     LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                     LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                     WHERE R.NAME = ? 
                )
            `, [roleName]);
        return qTotal;
    });
}

export const getGroupsWithRole = async (roleName: string): Promise<Group[]> => {
    return await doInDbConnection(async (conn: Connection) => {
        const q: QueryA = await conn.query(`
                SELECT 
                    G.ID AS G_ID,
                    G.NAME AS G_NAME,
                    G.DESCRIPTION AS G_DESCRIPTION,
                    G.STATUS AS G_STATUS,
                    R.ID AS R_ID,
                    R.NAME AS R_NAME,
                    R.DESCRIPTION AS R_DESCRIPTION
                FROM TBL_GROUP AS G
                LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                WHERE G.STATUS = 'ENABLED' 
                AND G.ID IN (
                    SELECT 
                        G.ID
                     FROM TBL_GROUP AS G
                     LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                     LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                     WHERE R.NAME = ? 
                )
            `, [roleName]);
        const m: Map<number/*groupId*/, Group> = new Map();
        const groups: Group[] = q.reduce((groups: Group[], c: QueryI) => {
            const groupId: number = c.G_ID;
            const groupName: string = c.G_NAME;
            const groupDescription: string = c.G_DESCRIPTION;
            const groupStatus: string = c.G_STATUS;
            if (!m.has(groupId)) {
                const g: Group = {
                    id: groupId,
                    name: groupName,
                    description: groupDescription,
                    status: groupStatus,
                    roles: []
                } as Group;
                groups.push(g);
                m.set(groupId, g);
            }
            const g: Group = m.get(groupId);
            const roleId: number = c.R_ID;
            const roleName: string = c.R_NAME;
            const roleDescription: string = c.R_DESCRIPTION;
            g.roles.push({
                id: roleId,
                name: roleName,
                description: roleDescription
            } as Role);
            return groups;
        }, []);

        return groups;
    });
}

export const getGroupById = async (groupId: number): Promise<Group> => {
    return await doInDbConnection(async (conn: Connection) => {
        const q: QueryA = await conn.query(`
                SELECT 
                    G.ID AS G_ID,
                    G.NAME AS G_NAME,
                    G.DESCRIPTION AS G_DESCRIPTION,
                    G.STATUS AS G_STATUS,
                    R.ID AS R_ID,
                    R.NAME AS R_NAME,
                    R.DESCRIPTION AS R_DESCRIPTION
                FROM TBL_GROUP AS G
                LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                WHERE G.STATUS = 'ENABLED' AND G.ID=? 
            `, [groupId]);

        const group: Group = q.reduce((group: Group, c: QueryI, index: number) => {
            const groupId: number = c.G_ID;
            const groupName: string = c.G_NAME;
            const groupDescription: string = c.G_DESCRIPTION;
            const groupStatus: string = c.G_STATUS;
            if (!!!group) {
                group = {
                    id: groupId,
                    name: groupName,
                    description: groupDescription,
                    status: groupStatus,
                    roles: []
                } as Group;
            }
            const roleId: number = c.R_ID;
            const roleName: string = c.R_NAME;
            const roleDescription: string = c.R_DESCRIPTION;
            group.roles.push({
                id: roleId,
                name: roleName,
                description: roleDescription
            } as Role);
            return group;
        }, null);

        return group;
    });
};



export const getAllGroupsCount = async (): Promise<number> => {
    return await doInDbConnection(async (conn: Connection) => {
        const qTotal: QueryA = await conn.query(`
                SELECT 
                    COUNT(*) AS COUNT
                FROM TBL_GROUP AS G
                WHERE G.STATUS = 'ENABLED'
            `, []);
        return qTotal;
    });
};

export const getAllGroups = async (): Promise<Group[]> => {
    return await doInDbConnection(async (conn: Connection) => {
        const q: QueryA = await conn.query(`
                SELECT 
                    G.ID AS G_ID,
                    G.NAME AS G_NAME,
                    G.DESCRIPTION AS G_DESCRIPTION,
                    G.STATUS AS G_STATUS,
                    R.ID AS R_ID,
                    R.NAME AS R_NAME,
                    R.DESCRIPTION AS R_DESCRIPTION
                FROM TBL_GROUP AS G
                LEFT JOIN TBL_LOOKUP_GROUP_ROLE AS LGR ON LGR.GROUP_ID = G.ID
                LEFT JOIN TBL_ROLE AS R ON R.ID = LGR.ROLE_ID
                WHERE G.STATUS = 'ENABLED'
            `, []);
        const m: Map<number/*groupId*/, Group> = new Map();
        const groups: Group[] = q.reduce((groups: Group[], c: QueryI) => {
            const groupId: number = c.G_ID;
            const groupName: string = c.G_NAME;
            const groupDescription: string = c.G_DESCRIPTION;
            const groupStatus: string = c.G_STATUS;
            if (!m.has(groupId)) {
                const g: Group = {
                    id: groupId,
                    name: groupName,
                    description: groupDescription,
                    status: groupStatus,
                    roles: []
                } as Group;
                groups.push(g);
                m.set(groupId, g);
            }
            const g: Group = m.get(groupId);
            const roleId: number = c.R_ID;
            const roleName: string = c.R_NAME;
            const roleDescription: string = c.R_DESCRIPTION;
            g.roles.push({
                id: roleId,
                name: roleName,
                description: roleDescription
            } as Role);
            return groups;
        }, []);
        return groups;
    });
}