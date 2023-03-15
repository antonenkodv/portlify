'use strict';
const {DataTypes} = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Portfolios', {
      type: 'foreign key',
      fields: ['userId'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Portfolios', 'portfolios_userId_fkey');
  }
};
