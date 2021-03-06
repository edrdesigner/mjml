import MJMLElement from './decorators/MJMLElement'
import React, { Component } from 'react'
import _ from 'lodash'
import  { widthParser } from '../helpers/mjAttribute'

/**
 * Columns are the basic containers for your content. They must be located under mj-section tags in order to be considered by the engine
 */
@MJMLElement({
  tagName: 'mj-column'
})
class Column extends Component {

  static baseStyles = {
    td: {
      border: 'none',
      borderSpacing: '0'
    },
    div: {
      verticalAlign: "top"
    }
  };

  getStyles() {
    const { mjAttribute } = this.props

    return _.merge({}, this.constructor.baseStyles, {
      div: {
        display: "inline-block",
        verticalAlign: mjAttribute('vertical-align'),
        fontSize: "13",
        textAlign: "left",
        minWidth: mjAttribute('width')
      }
    })
  }

  getColumnClass() {
    const { mjAttribute, sibling } = this.props
    let width = mjAttribute('width')

    if (width == undefined) {
      return `mj-column-per-${100/sibling}`
    }

    const { width: parsedWidth, unit } = widthParser(width)

    switch(unit) {
    case '%':
      return `mj-column-per-${parsedWidth}`

    case 'px':
    default:
      return `mj-column-px-${parsedWidth}`
    }
  }

  render() {
    const { mjAttribute, renderChildren, sibling } = this.props
    const width = mjAttribute('width') || (100 / sibling)
    const mjColumnClass = this.getColumnClass()

    this.styles = this.getStyles()

    return (
      <div style={this.styles.div} className={mjColumnClass} aria-labelledby={mjColumnClass} data-column-width={parseInt(width)}>
        <table
          width="100%">
          <tbody>
            {renderChildren()}
          </tbody>
        </table>
      </div>
    )
  }

}

export default Column
