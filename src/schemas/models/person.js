import Sequelize from 'sequelize';
import sequelize from '../../config/sequelize';

export default sequelize.define('person', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING
});
