'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('helpdesk', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      organisation_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'organisation',
          key: 'id',
        },
      },
      email: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.STRING,
      },
      created: {
        type: 'TIMESTAMP WITH TIME ZONE',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      modified: {
        type: 'TIMESTAMP WITH TIME ZONE',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('helpdesk')
  },
}
