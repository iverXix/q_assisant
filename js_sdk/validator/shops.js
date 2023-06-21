// 表单校验规则由 schema2code 生成，不建议直接修改校验规则，而建议通过 schema2code 生成, 详情: https://uniapp.dcloud.net.cn/uniCloud/schema


const validator = {
  "s_name": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "店名",
    "label": "店名"
  },
  "s_telephone": {
    "rules": [
      {
        "format": "int"
      }
    ],
    "title": "商家电话",
    "label": "商家电话"
  },
  "s_address": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "地址",
    "label": "地址"
  },
  "s_level": {
    "rules": [
      {
        "format": "double"
      }
    ],
    "title": "档口星级评分",
    "label": "档口星级评分"
  },
  "s_hours": {
    "rules": [
      {
        "format": "timestamp"
      }
    ],
    "title": "营业时间",
    "label": "营业时间"
  },
  "s_category": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "种类",
    "label": "种类"
  },
  "s_img": {
    "rules": [
      {
        "format": "file"
      }
    ],
    "title": "照片",
    "label": "照片"
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
