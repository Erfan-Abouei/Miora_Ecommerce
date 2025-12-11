'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        user_name: 'عرفان ابویی',
        phone_number: '09393929968',
        role: 'CEO',
        password: '1234',
        email: 'erfan-ceo@gmail.com',
        is_subscribed_for_newsletter: true,
        is_phone_veryfied: true,
        is_email_veryfied: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
