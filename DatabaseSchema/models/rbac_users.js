export const users = (sequelize,DataTypes) => {
    const model = sequelize.define(
        "rbac_users",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull:true
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull:true
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull:true
            },
            country_code: {
                type: DataTypes.STRING(255),
            },
            contact: {
                type: DataTypes.STRING(255),
            },
            password: {
                type: DataTypes.STRING(255)
            },
            photo: {
                type: DataTypes.UUID
            },
            consent_accepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            email_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            contact_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            is_verified_user: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            status_code: {
                type: DataTypes.INTEGER,
                defaultValue: 200
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            auth_provider: {
                type: DataTypes.STRING(50),
                defaultValue: "local"
            },
            first_name_lang_key: {
               type: DataTypes.UUID
            },
            last_name_lang_key: {
               type: DataTypes.UUID
            },
            email_lang_key:{
                type: DataTypes.UUID
            },
            password_lang_key:{
                type: DataTypes.UUID
            }
        },
        {
            timestamps: false
        }
    );
    return model;
};
