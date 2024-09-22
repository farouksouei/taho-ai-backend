import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";

class Spending extends Model {
  public userid!: number;
  public count!: number;
  public createdat!: Date;
  public type!: string;
  public model!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Spending.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Represents the user making the spending entry
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Amount of money spent
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,  // Auto-set to the current date/time
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,  // Category/type of spending (e.g., "Food")
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false,  // Spending model (e.g., "Credit Card", "Cash")
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "spendings",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Spending;
