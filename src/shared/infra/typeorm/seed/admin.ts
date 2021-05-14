import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const password = await hash("admin", 8);

    const connection = await createConnection();

    const id = uuidV4();

    await connection.query(
        `INSERT INTO USERS(id, name, "userName", password, "isProfessor", "isAdmin", avatar, created_at)
            values('${id}', 'Thiago Augusto', 'thiago.augusto', '${password}', true, true, 'default', 'now()')
        `
    );

    await connection.close;
}

create().then(() => console.log("User admin created!"));