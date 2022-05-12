const tripModel = (sequelize, Sequelize, DataTypes) => {
        const Trip = sequelize.define('Trip', {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            title: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            offer_description: {
              type: DataTypes.STRING(2000),
              allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            img: {
                type: DataTypes.STRING,
                allowNull: false
            },
            trip_description: {
                type: DataTypes.STRING(2000),
                allowNull: false
            },
            beg_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
                // validate: {
                //     isLaterThanBegDate(value) {
                //         if (value >= this.beg_date) {
                //           throw new Error('end_date must be later than beg_date');
                //         }
                //       }
                // }
            },
            tickets_left: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
          }, {
            tableName: 'trips'
          });

          return Trip;
    };   

export default tripModel;