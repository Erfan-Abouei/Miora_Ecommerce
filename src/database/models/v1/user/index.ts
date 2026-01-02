import type { Model } from 'sequelize';
import type { UserData } from '@/types/modules/v1/user/user-auth/data/user-date.type';
import type { CreateUserWithAdminAccessDTO, RegisterUserDTO } from '@/types/modules/v1/user/user-auth/dto/user-dto.type';
import sequelize from '@/database/database.config';
import { ValidationMessage } from '@/constants';
import { Pattern } from '@/constants';
import { DataTypes } from 'sequelize';

// User model for the system. Stores basic user information, roles, subscription status, verification flags (email/phone), and optional profile details.
// This model is used for both admin-created users and self-registered users.
export const UserModel = sequelize.define<Model<UserData, CreateUserWithAdminAccessDTO | RegisterUserDTO>>(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: null,
      validate: {
        len: {
          args: [3, 50],
          msg: `${ValidationMessage.NAME_TOO_SHORT} + Database Error !`,
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: `${ValidationMessage.EMAIL_REQUIRED} + Database Error !` },
        isEmail: { msg: `${ValidationMessage.EMAIL_INVALID} + Database Error !` },
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: `${ValidationMessage.PHONE_REQUIRED} + Database Error !` },
        is: { args: new RegExp(Pattern.PHONE_NUMBER), msg: `${ValidationMessage.PHONE_INVALID} + Database Error !` },
      },
    },
    role: {
      type: DataTypes.ENUM('CUSTOMER', 'ADMIN', 'SEO'),
      allowNull: false,
      defaultValue: 'CUSTOMER',
      validate: {
        isIn: {
          args: [['CUSTOMER', 'ADMIN', 'SEO']],
          msg: `${ValidationMessage.ROLE_INVALID} + Database Error !`,
        },
      },
    },
    gender: {
      type: DataTypes.ENUM('MALE', 'FEMALE'),
      allowNull: true,
      defaultValue: null,
      validate: {
        isIn: {
          args: [['MALE', 'FEMALE']],
          msg: `${ValidationMessage.GENDER_INVALID} + Database Error !`,
        },
      },
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      validate: {
        isDate: { args: true, msg: `${ValidationMessage.BIRTH_DATE_INVALID} + Database Error !` },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `${ValidationMessage.PASSWORD_REQUIRED} + Database Error !` },
        len: { args: [6, 100], msg: `${ValidationMessage.PASSWORD_INVALID} + Database Error !` },
      },
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      validate: {
        isUrl: true, // dont need message !
      },
    },
    bank_card_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        isCreditCard: { args: true, msg: `${ValidationMessage.BANK_NUMBER_INVALID} + Database Error !` },
      },
    },
    sheba_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      validate: {
        is: { args: new RegExp(Pattern.SHEBA_NUMBER), msg: `${ValidationMessage.SHEBA_NUMBER_INVALID} + Database Error !` },
      },
    },
    is_subscribed_for_newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);
