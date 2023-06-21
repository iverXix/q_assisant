// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "c_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "优惠券名称",
    "label": "优惠券名称"
  },
  "c_time": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "使用时间",
    "label": "使用时间"
  },
  "c_score": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "积分价值",
    "label": "积分价值"
  },
  "c_price": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "面值",
    "label": "面值"
  },
  "c_term": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "使用条件",
    "label": "使用条件"
  }
}

const enumConverter = {}

function filterToWhere(filter, command) {
  let where = {}
  for (let field in filter) {
    let { type, value } = filter[field]
    switch (type) {
      case "search":
        if (typeof value === 'string' && value.length) {
          where[field] = new RegExp(value)
        }
        break;
      case "select":
        if (value.length) {
          let selectValue = []
          for (let s of value) {
            selectValue.push(command.eq(s))
          }
          where[field] = command.or(selectValue)
        }
        break;
      case "range":
        if (value.length) {
          let gt = value[0]
          let lt = value[1]
          where[field] = command.and([command.gte(gt), command.lte(lt)])
        }
        break;
      case "date":
        if (value.length) {
          let [s, e] = value
          let startDate = new Date(s)
          let endDate = new Date(e)
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
      case "timestamp":
        if (value.length) {
          let [startDate, endDate] = value
          where[field] = command.and([command.gte(startDate), command.lte(endDate)])
        }
        break;
    }
  }
  return where
}

export { validator, enumConverter, filterToWhere }
