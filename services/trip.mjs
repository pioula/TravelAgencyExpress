const tripModel = (sequelize, Sequelize, DataTypes) => {
        const Trip = sequelize.define('Trip', {
            // Model attributes are defined here
            title: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
            },
            offer_description: {
              type: DataTypes.STRING,
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
                type: DataTypes.STRING,
                allowNull: false
            },
            beg_date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isLaterThanBegDate(value) {
                        if (value >= this.beg_date) {
                          throw new Error('end_date must be later than beg_date');
                        }
                      }
                }
            },
            tickets_left: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
          }, {
            tableName: 'Trips'
          });

          return Trip;
    };   

export default tripModel;