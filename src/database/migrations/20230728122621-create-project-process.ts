import { DataTypes, ModelAttributes, QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("projects_process", {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "organizations_projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      order_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    } as ModelAttributes);
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("projects_process");
  },
};
