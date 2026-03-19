export const SaveToDataBase = ({model,data}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const savedUser = await model.create(data);
            resolve(savedUser);
        } catch (error) {
            console.error("Sequelize Error:", error);
            reject(error);
        }
    });
};

export const UpsertInDataBase = ({model,fields,updateOnDuplicate,data,transaction}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [user] = await model.upsert(
                data,
                {
                    fields,
                    updateOnDuplicate,
                    transaction
                }
            );
            resolve(user);
        } catch (error) {
            console.error("Sequelize Error:", error);
            reject(error);
        }
    });
};

export const DestroyFromDataBase = ({model,where,transaction}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleted = await model.destroy({
                where,
                transaction
            });
            resolve(deleted > 0);
        } catch (error) {
            reject(error);
        }
    });
};
