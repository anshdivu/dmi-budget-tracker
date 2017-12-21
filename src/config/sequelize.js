import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.RAZZLE_DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true // heroku requires that postgres connection always uses `ssl`
  },
  operatorsAliases: false, // security setting => http://docs.sequelizejs.com/manual/tutorial/querying.html#operators-security
  define: {
    freezeTableName: true, // prevent sequelize from pluralizing table names
    timestamps: false // prevent sequelize from using timestamp columns like createdAt, updatedAt
  }
});

export default sequelize;
