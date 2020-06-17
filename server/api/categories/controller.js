import db from '../../models'
import { Sequelize } from '../../models'
import Parametrizer from '../../utils/parametrizer'
import RESPONSES from '../../utils/responses'
import _ from 'lodash'

class CategoriesController {
  static Fetch(req, res) {
    const { Op } = Sequelize
    const attrs = ['id', 'name', 'active']
    const search = ['name']
    const { filter } = req.query
    const options = Parametrizer.getOptions(req.query, attrs, search)
    if (filter) {
      options.where.name = {
        [Op.like]: `%${filter}%`,
      }
    }
    options.include = [
      {
        model: db.User,
        as: 'users',
        attributes: ['id', 'fullname', 'lastname', 'img', 'email'],
        include: [
          {
            model: db.Schedule,
          },
        ],
        through: {
          attributes: ['id', 'UserId', 'CategoryId'],
        },
      },
    ]
    db.Category.findAndCountAll(options)
      .then(data => {
        res.status(200).json(Parametrizer.responseOk(data, options))
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch((err) => {
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message, err })
      })
  }
  static FetchOne(req, res) {
    const id = +req.params.id
    db.Category.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            ok: true,
            payload: result,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({
          message: msg.errors[0].message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
      )
  }
  static Create(req, res) {
    const { name, active } = req.body
    db.Category.create(req.body)
      .then((speciality) => {
        res.status(200).json({
          ok: true,
          speciality,
        })
      })
      .catch(Sequelize.ValidationError, (msg) => {
        res.status(422).json({ message: msg.original.message })
      })
      .catch((err) => {
        res.status(400).json({ message: RESPONSES.DB_CONNECTION_ERROR.message })
      })
  }
  static Update(req, res) {
    const { specialityname, description, active, permissions } = req.body
    const id = +req.params.id
    if (permissions.length > 0) {
      db.Category.findOne({
        where: {
          id,
        },
      }).then((speciality) => {
        res.status(200).json(speciality)
      })
    } else {
      db.Category.update(
        {
          id,
          specialityname,
          description,
          active,
        },
        { where: { id } },
      )
        .then((speciality) => {})
        .catch(Sequelize.ValidationError, (msg) =>
          res.status(422).json({ message: msg.errors[0].message }),
        )
        .catch((err) =>
          res
            .status(400)
            .json({ message: RESPONSES.DB_CONNECTION_ERROR.message }),
        )
    }
  }
  static Delete(req, res) {
    const { id } = req.params
    db.Category.destroy({ where: { id } })
      .then((result) => {
        if (result === 0) {
          res.status(404).json({
            error: RESPONSES.RECORD_NOT_FOUND_ERROR.message,
          })
        } else {
          res.status(200).json({
            message: RESPONSES.DELETE_RECORD_ERROR.message,
          })
        }
      })
      .catch(Sequelize.ValidationError, (msg) =>
        res.status(422).json({ message: msg.errors[0].message }),
      )
      .catch(Sequelize.ForeignKeyConstraintError, (err) =>
        res.status(400).json({
          message: RESPONSES.RECORD_IN_USE_ERROR.message,
        }),
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: RESPONSES.DB_CONNECTION_ERROR.message + err }),
      )
  }
}
export default CategoriesController
