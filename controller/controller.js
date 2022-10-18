const { search } = require("../models");
const Sequelize = require("sequelize");

class SerchString {

    async createUser(req, res) {
        try {
          var user = await search.create(req.body);
          res.status(201).json({ data: user, status: 201 });
        } catch (error) {
          res
            .status(error.status || 500)
            .json({ message: error.message, status: error.status || 500 });
        }
      }

    async findAllData(req, res) {
    try {
        const name = req.query.name;
        var condition = name
        ? { name: { [Op.iLike]: `%${name}%` } }
        : null;
        var users = await search.findAll({ where: condition });
        // console.log(users)
        return res.status(200).json({
        status: 200,
        data: users,
        });
    } catch (err) {
        res.status(501).json({ message: err.message, status: 501 });
    }
    }

    // async findUserByName(req, res) {
    //     try {
    //       const name = req.params.name;
    
    //       var users = await search.findOne({ where: { name : name }});
    //       // console.log(users);
    //       return res.status(200).json({
    //         status: 200,
    //         data: users,
    //       });
    //     } catch (err) {
    //       res.status(501).json({ message: err.message, status: 501 });
    //     }
    //   }


    async findUserSearch(req, res) {
    try {
        const keyword = req.body.search;
        var limit = req.body.limit;
        var pageNo = (req.body.page - 1) * limit;
        var users = await search.findAll(
        { 
            where:{
                [Sequelize.Op.or]:
                { 
                    email : {
                        [Sequelize.Op.like]: '%'+keyword+'%' 
                    },
                    name : {
                        [Sequelize.Op.like]: '%'+keyword+'%' 
                    } 
                }
            },
            limit:limit,
            offset:pageNo
        });
        // console.log(users);
        return res.status(200).json({
        status: 200,
        data: users,
        });
    } catch (err) {
        res.status(501).json({ message: err.message, status: 501 });
    }
    }
    
}
module.exports = new SerchString();
